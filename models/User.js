const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userSchema = Schema(
    {
      name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        min: 6,
        max: 255
      },
      password: {
        type: String,
        required: true,
        trim: true,
        min: 6,
        max: 30,
        selected: false
      },
      role: {
        type: String,
        required: true,
        trim: true,
        default: 'client'
      }
    },
    { timestamps: true }
  );

module.exports = mongoose.model('User', userSchema);
