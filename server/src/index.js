require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const dbConn = require('./connections/dbConnection');
const Message = require('./models/message');
require('./connections/socketConnection')(server);

//Serve static files from client build
const UI_BUILD = path.join(__dirname, '..', '..', 'client', 'build');
app.use(express.static(UI_BUILD));

//TODO: export routes from the Chat package, and import them here as "app.use('/api', Routes())"
app.get('/api/channel/:channel/message', (req, res) =>{
  Message.find({
    channel_id: req.params.channel
  }).
  limit(10).
  sort('+created_at'), (err, messages) => {
    res.json(messages);
  };
  // res.json({'hi':true})
});

//Forward all paths to client for routing
app.get('*', (req, res) =>{
  res.sendFile(path.join(UI_BUILD, 'index.html'));
});

dbConn.then(() => {
  const PORT = process.env.PORT || 4000
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });
});
