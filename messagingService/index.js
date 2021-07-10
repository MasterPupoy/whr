const express = require('express');
const emailService = express();
const cors = require('cors');
const mongoose = require('mongoose');

// an http server that creates an instance of express
const httpServer = require('http').createServer(emailService)
// enable websocket server
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000']
  }
});


const mailRoutes = require('./routes/emailRoutes');


require('dotenv').config();

const PORT =  4004;
const DB_URI = process.env.DB_URI;

emailService.use(cors());
emailService.use(express.json());

mongoose.connect(`mongodb+srv://master_pupoy:wi7nB3Tv78go5DJQ@cluster1.zhjgs.mongodb.net/whr3?retryWrites=true&w=majority`, {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB atlas`);
});

emailService.use('/delivery', mailRoutes);

httpServer.listen(PORT, () => {
  console.log(`Message service running on PORT : ${PORT}`);
});

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on('connect', (socket) => {

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });


  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on('private message', ({ content, to }) => {
    socket.to(to).emit('private message', { content, from: socket.id})
  })

  socket.on('reconnect', () => {
    socket.emit('users', users);
  })

});