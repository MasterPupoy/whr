const SMTPServer = require('smtp-server').SMTPServer;
const parser = require('mailparser').simpleParser;
const mongoose = require('mongoose');

mongoose.connect(`${DB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB connection established');  
}).catch(err => console.log(err));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// create a schema less model 
//const mailSchema = mongoose.Schema({});

const server = new SMTPServer({
  requireTLS: true,
  onData(stream, session, callback){
    let mail = ''
    
    stream.on('data', chunk => {
      message += chunk
    })

    stream.on('end', () => {
      parser(message).then(parsed => {

      }).catch(err => console.log(err));
    });
  },
  disabledCommands : ['AUTH']
});

server.on("error", err => {
  console.log(err);
})

server.listen(25, () => {
  console.log('Bound to 104.236.215.216 on PORT 25');
});