const express = require('express');
const userService = express();
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const companyRoutes = require('./routes/companyRoutes');

require('dotenv').config();

// use environment PORT or 5002. Update USER_SERVICE_URL on gateway if altered
const PORT = process.env.PORT || 5002;
// DB_URI on env
const DB_URI = process.env.DB_URI;

userService.use(cors());
userService.use(express.json());

// configure mongoose
mongoose.connect(`${DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.once('open', () => console.log('Connected to MongoDB atlas'));

// configure routes
userService.use('/employee', employeeRoutes);
userService.use('/organization', companyRoutes);

userService.listen(PORT, () => {
  console.log(`user service running on PORT: ${PORT}`);
})