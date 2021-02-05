const mongoose = require('mongoose');

const dbConn = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  auth: {
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  }
});

mongoose.connection.on('connected', function () {
  console.log('database connection established');
});

mongoose.connection.on('error',function (err) { 
  console.log(`database connection error ${err}`);
}); 

mongoose.connection.on('disconnected', function () { 
  console.log('database connection ended'); 
});

process.on('SIGINT', function() {   
  mongoose.connection.close(function () { 
    process.exit(0); 
  }); 
});


module.exports = dbConn