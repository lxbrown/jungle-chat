const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

const { joinChat, leaveChat, sendMessage } = require('./chatHandler')(io);
const { joinLaunch, leaveLaunch, refreshChannels } = require('./channelHandler')(io);

const PORT = 4000;

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

server.listen(PORT);