const User = require('../models/User');
const CommonHelper = require('../helpers/common');
module.exports = {
  register: async function(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email: email.trim(), isActive: true });
      if (user) return res.status(400).send({ success: false, message: 'Email Already Already in use. Please try to register with different email.'})
      const newUser = new User({
        name: name.trim(),
        email: email.trim(),
        password: CommonHelper.hashPassword(password),
        isActive: true
      })
      await newUser.save();
      return res.status(200).send({ success: true, message: 'Registartion Successfull.', data: null });
    } catch (error) {
      return res.status(500).send({ success: false,  message: 'Something went wrong.', data: error.message })
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email.trim() }).select('+password').lean();
      if (user  && (CommonHelper.comparePassword(password, user.password))) {
        if(!user.isActive) return res.status(400).send({ success: false, message: 'Your account is inactive. Please contact admin', data: null });
        const token = CommonHelper.generateUserToken(user);
        await User.updateOne({ _id: user._id }, { $set:{ isLoggedIn: true, lastLogin: new Date() }})
        return res.status(200).send({ success: true, message: 'Login Success', token: token, user: user._id, userType: user.userType });
      } else {
        return res.status(400).send({ success: false, message: 'Invalid credentials', data: null });
      }
    } catch (error) {
      return res.status(500).send({ success: false,  message: 'Something went wrong.', data: error.message })
    }
  },
  getProfile: async function(req, res) {
    try {
      const user = await User.findOne({ _id: req.auth.credentials.id }).lean();
      if (!user) return res.status(200).send({ success: false, message: 'Data Not Found', data: null });
      return res.status(200).send({ success: true, message: 'Success', data: user });
    } catch (error) {
      return res.status(500).send({ success: false,  message: 'Something went wrong.', data: error.message })
    }
  }
}