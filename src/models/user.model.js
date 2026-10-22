const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    gender: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

userSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(this.password, salt, 64).toString('hex');
  this.password = `${salt}:${hash}`;
  next();
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.password;
    return returnedObject;
  }
});

module.exports = mongoose.model('User', userSchema);
