const mongoose = require('mongoose');

const dbConn = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  }
});

mongoose.connection.on('connected', function () {
  console.log('connected to db');
});

mongoose.connection.on('error',function (err) { 
  console.log(`DB connection error ${err}`);
}); 

mongoose.connection.on('disconnected', function () { 
  console.log('disconnected from db'); 
});

process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); 
  }); 
});


module.exports = dbConn