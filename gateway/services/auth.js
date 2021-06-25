const jwt = require('jsonwebtoken');
const { secret } = require('../utils');

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.slice(7, token.length);

    return jwt.verify(token, secret, (err) => {
      if (err) {
        return res.send({ auth: 'failed' });
      }
      return next();
    });
  }

  return res.send({ auth: 'failed' });
};
