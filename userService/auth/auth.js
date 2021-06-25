const jwt = require('jsonwebtoken');
const { secret } = require('../utils');

module.exports.createAccessToken = (user) => {
  const data = {
    cid: user.company_id,
    id: user._id,
    access_level: user.access_level
  };

  // return token 
  return jwt.sign(data, secret, {}) 
};

// token verification 
module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization
  if (token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.send({ auth: 'failed' });
      }
      return next();
    });
  };

  return res.send({ auth: 'failed' });
};

// decode token 
module.exports.decode = (token) => {
	if(token){ //if token exists
		return jwt.verify(token, secret, (err, decoded) => {
			return (err) ? null : jwt.decode(token, {complete: true}).payload
		});
	}

  return null
};
