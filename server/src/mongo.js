require('dotenv').config();


const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(MONGODB_URI_WITHOUT_AUTH, {
  useNewUrlParser: true,
  auth: {
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD
  }
});
client.connect(err => {
  console.log(err);
  // const collection = client.db("test").collection("devices");
  // // perform actions on the collection object
  // client.close();
});
