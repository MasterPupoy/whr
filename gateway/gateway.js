/* eslint-disable no-console */
// node js api gateway
const gateway = require('express')();

const { APPLICANT_SERVICE, USER_SERVICE } = require('./services/services');

const PORT = 5000;

gateway.use('/apply', APPLICANT_SERVICE);
gateway.use('/whr', USER_SERVICE);

gateway.listen(PORT, () => {
  console.log(`API gateway running on PORT : ${PORT}`);
});
