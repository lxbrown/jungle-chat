const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  }
})