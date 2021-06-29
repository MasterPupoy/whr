const jwt = require('jsonwebtoken');
const { secret } = require('../utils');

module.exports.verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.send({ auth: 'failed' });
      }
      return next();
    });
  }

  return res.send({ auth: 'failed' });
};
