require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGODB_URI_WITHOUT_AUTH, {
  useNewUrlParser: true,
  auth: {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD
  }
});
client.connect(err => {
  console.log(err);
  // const collection = client.db("test").collection("devices");
  // // perform actions on the collection object
  // client.close();
});
