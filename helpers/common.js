const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateUserToken = (user) => {
  const jwtdata = {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    loginWay: 'Customer'
  };
  return jwt.sign(jwtdata, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
hashPassword,
comparePassword,
generateUserToken,
}

