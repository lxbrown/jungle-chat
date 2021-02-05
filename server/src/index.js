require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const routes = require('./routes');
const registerSocketEvents = require('./events');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: process.env.CORS_ORIGIN});

// const dbConn = require('./connections/dbConnection');

//Serve static files from client build
const UI_BUILD = path.join(__dirname, '..', '..', 'client', 'build');
app.use(express.static(UI_BUILD));

registerSocketEvents(io);
app.use('/api', routes());

//Forward all other paths to client for routing
app.get('*', (req, res) => {
  res.sendFile(path.join(UI_BUILD, 'index.html'));
});

// dbConn.then(() => {
  const PORT = process.env.PORT || 4000
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });
// });
