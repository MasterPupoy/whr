/*
All api service url
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

const APPLICANT_SERVICE_URL = 'http://localhost:4001';
const USER_SERVICE_URL = 'http://localhost:4002';
const FILE_SERVICE_URL = 'http://localhost:4003';
const EMAIL_SERVICE_URL = 'http://localhost:4004';

const APPLICANT_SERVICE = createProxyMiddleware({
  target: APPLICANT_SERVICE_URL,
  pathRewrite: {
    '^/apply': '',
  },
});

const USER_SERVICE = createProxyMiddleware({
  target: USER_SERVICE_URL,
  pathRewrite: {
    '^/whr': '',
  },
});

const FILE_SERVICE = createProxyMiddleware({
  target: FILE_SERVICE_URL,
  pathRewrite: {
    '^/file': '',
  },
});

const EMAIL_SERVICE = createProxyMiddleware({
  target: EMAIL_SERVICE_URL,
  ws: true,
  pathRewrite: {
    '^/email': '',
  },
});

module.exports = { APPLICANT_SERVICE, USER_SERVICE, EMAIL_SERVICE, FILE_SERVICE };
