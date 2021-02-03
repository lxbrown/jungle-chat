const path = require('path');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

const { joinChat, leaveChat, sendMessage } = require('./chatHandler')(io);
const { joinLaunch, leaveLaunch, refreshChannels } = require('./channelHandler')(io);

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log('connect');
  socket.on('chat:join', joinChat);
  socket.on('chat:message', sendMessage);
  socket.on('chat:leave', leaveChat);

  socket.on('launch:join', joinLaunch);
  socket.on('launch:message', leaveLaunch);

  socket.on('chat:join', refreshChannels);
  socket.on('chat:leave', refreshChannels);

  socket.on('disconnect', refreshChannels);
  socket.on('disconnect', () => { console.log('dc') });
});

//Delegate all requests to react for routing
const UI_BUILD = path.join(__dirname, '..', '..', 'client', 'build');
app.use(express.static(UI_BUILD));

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('SsQPB8WZyBVbhzQG1qYbpfP8iBzInkeg5GCwnnwV-mg.ruue5-HIbyvmAveIF8RzrCtHVxOWiUIrtOQn803Ujkw')
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(UI_BUILD, 'index.html'));
});

console.log('using ' + UI_BUILD);
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});
