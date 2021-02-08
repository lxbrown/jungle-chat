const interactions = require('./interactions')();

module.exports = (io, socket) => {
    const joinChat = chatId => {
    const room = idToRoom(chatId)
    console.log(`joining ${room}`);
    socket.join(room);
  };
  
  const leaveChat = chatId => {
    const room = idToRoom(chatId)
    console.log(`leaving ${room}`);
    socket.leave(room);
  };
  
  const sendMessage = (chatId, newMessage) => {
    const room = idToRoom(chatId);
    console.log(`messaging ${room}`);

    interactions.sendMessage(socket.id, chatId, newMessage.message_body).then(() => {
      io.in(room).emit('chat:message', newMessage);
    }, err => {
      //TODO: write to internal log and notify user of failure
      console.log(err);
    });
  };
  
  socket.on('chat:join', joinChat);
  socket.on('chat:message', sendMessage);
  socket.on('chat:leave', leaveChat);

  return;
}

function idToRoom(chatId) {
  return `channel:${chatId}`
}