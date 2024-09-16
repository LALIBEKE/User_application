// Model (models/User.js)

const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    default: "example@gmail.com",
    require: true,
  },
  phone: String,
  password: String
})
module.exports = mongoose.model('User', UserSchema)