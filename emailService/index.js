const express = require('express');
const emailService = express();
const cors = require('cors');
const mongoose = require('mongoose');

const mailRoutes = require('./routes/emailRoutes');

require('dotenv').config();

const PORT = process.env.PORT || 5004;
const DB_URI = process.env.DB_URI;

emailService.use(cors());
emailService.use(express.json());

mongoose.connect(`${DB_URI}`, {
  useUnifiedTopology : true,
  useNewUrlParser: true
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB atlas`);
});

emailService.use('/', mailRoutes);

emailService.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});