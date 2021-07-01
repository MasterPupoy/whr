const express = require('express');
const appService = express();
const cors = require('cors');

const PORT = 5001;

appService.use(cors());
appService.use(express.json());

appService.get('/whr', (req, res) => {
  res.send('ola from applicantService')
});

appService.listen(PORT, () => {
  console.log(`applicant service running on PORT:${PORT}`);
});