const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  history: [
    {
      type: { type: String, enum: ['user', 'ai'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ]
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
