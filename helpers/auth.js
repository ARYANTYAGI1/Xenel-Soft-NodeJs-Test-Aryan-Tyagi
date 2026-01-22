const Jwt = require('jsonwebtoken');
const User = require('../models/User');

const getTokenFromHeader = (req) => {
  const header = req.headers['authorization'] || req.headers['auth'];
  if (!header) return '';
  return header.startsWith('Bearer ') ? header.split(' ')[1] : '';
};


const validateCustomer = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
    Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send({success: false, message: 'Failed to authenticate token' });
      }
      if (decoded.loginWay !== 'Customer') {
        return res.status(401).send({ success: false, message: 'Customer access only' });
      }
      const user = await User.findOne({ _id: decoded.id, email: decoded.email, isActive: true, isLoggedIn: true }).lean();
      if (!user) {
        return res.status(401).send({ success: false, message: 'Session expired or user inactive' });
      }
      req.auth = { credentials: decoded, token };
      next();
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Authentication failed', data: error.message });
  }
};

module.exports = {
  validateCustomer
};
