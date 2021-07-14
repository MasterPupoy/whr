const express = require('express');
const userService = express();
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4002;

require('dotenv').config();

// use environment PORT or 5002. Update USER_SERVICE_URL on gateway if altered
// DB_URI on env
const DB_URI = process.env.DB_URI;
const DB_LOCAL = process.env.DB_LOCAL;

userService.use(cors());
userService.use(express.json());

// configure mongoose
mongoose.connect(`mongodb+srv://master_pupoy:wi7nB3Tv78go5DJQ@cluster1.zhjgs.mongodb.net/whr3?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log(`MongoDB connection established`)
}).catch(err => console.log(err));

mongoose.connection.once('open', () => console.log('Connected to MongoDB atlas'));

const employeeRoutes = require('./routes/employeeRoutes');
const companyRoutes = require('./routes/companyRoutes');


// configure routes
userService.use('/employee', employeeRoutes);
userService.use('/organization', companyRoutes);

userService.listen(PORT, () => {
  console.log(`user service running on PORT: ${PORT}`);
})