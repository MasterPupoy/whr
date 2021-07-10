/* eslint-disable no-console */
// node js api gateway
const gateway = require('express')();
const {
  APPLICANT_SERVICE,
  USER_SERVICE,
  EMAIL_SERVICE,
  FILE_SERVICE,
} = require('./services/services');

const auth = require('./services/auth');

const PORT = 4000;

gateway.use('/apply', APPLICANT_SERVICE);
gateway.use('/whr', USER_SERVICE);
gateway.use('/email', EMAIL_SERVICE);
gateway.use('/file', FILE_SERVICE);

gateway.listen(PORT, () => {
  console.log(`API gateway running on PORT : ${PORT}`);
});
