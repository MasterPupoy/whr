/*
All api service url
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

const APPLICANT_SERVICE_URL = 'http://localhost:5001';
const USER_SERVICE_URL = 'http://localhost:5002';
const EMAIL_SERVICE_URL = 'http://localhost:5004';

const APPLICANT_SERVICE = createProxyMiddleware({
  target: APPLICANT_SERVICE_URL,
  changeOrigin: true,
});

const USER_SERVICE = createProxyMiddleware({
  target: USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/whr': '',
  },
});

const EMAIL_SERVICE = createProxyMiddleware({
  target: EMAIL_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/email': '',
  },
});

module.exports = { APPLICANT_SERVICE, USER_SERVICE, EMAIL_SERVICE };
