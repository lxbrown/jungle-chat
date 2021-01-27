const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = 3000;
const MESSAGE_EVENT = 'newMessage';

io.on('connection', (socket) => {
  const { chatId } = socket.handshake.query;
  socket.join(chatId);

  socket.on(MESSAGE_EVENT, (msg) => {
    io.in(chatId).emit(MESSAGE_EVENT, msg);
  });
  socket.on('disconnect', () => {
    socket.leave(chatId);
  })
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});