const express = require('express');
const appService = express();
const cors = require('cors');
const mongoose = require('mongoose');

const applicantRoutes = require('./routes/applicantRoutes');
const jobRoutes = require('./routes/jobRoutes');

const PORT = 5001;
require('dotenv').config();

// DB_URI on env
const DB_URI = process.env.DB_URI;
const DB_LOCAL = process.env.DB_LOCAL;

appService.use(cors());
appService.use(express.json());


// configure mongoose
mongoose.connect(`${DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).catch(err => console.log(err));

mongoose.connection.once('open', () => console.log('Connected to MongoDB atlas'));


appService.use('/openings', applicantRoutes);
appService.use('/jobs', jobRoutes)

appService.listen(PORT, () => {
  console.log(`applicant service running on PORT:${PORT}`);
});