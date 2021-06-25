const userService = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();

// use environment PORT or 5002. Update USER_SERVICE_URL on gateway if altered
const PORT = process.env.PORT || 5002;
// DB_URI on env
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

// configure mongoose
mongoose.connect(`${DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.once('open', () => console.log('Connected to MongoDB atlas'));

// configure routes
app.use('/', userRoutes);

userService.listen(PORT, () => {
  console.log(`user service running on PORT: ${PORT}`);
})