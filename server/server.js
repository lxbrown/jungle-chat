require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const routes = require('./src/routes');
const registerSocketEvents = require('./src/events');
const dbConn = require('./src/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Serve static files from client build
const UI_BUILD = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(UI_BUILD));

//Set up socket and API routing
registerSocketEvents(io);
app.use(bodyParser.json());
app.use('/api', routes());

//Forward all other paths to client for routing
app.get('*', (req, res) => {
  res.sendFile(path.join(UI_BUILD, 'index.html'));
});

dbConn.then(() => {
  const PORT = process.env.PORT || 4000
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });
});
