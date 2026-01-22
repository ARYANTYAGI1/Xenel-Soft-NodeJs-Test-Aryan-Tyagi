const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true, index: true },
  password: { type: String, select: false },
  isActive: { type: Boolean, default: true},
  isLoggedIn: { type: Boolean, default: false, enum: [ true, false ]},
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);