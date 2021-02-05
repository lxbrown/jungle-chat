const Message = require('./db/model');

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

    const message = new Message({
      socket_id: newMessage.senderId,
      channel_id: chatId,
      display_name: 'TODO',
      message_body: newMessage.body
    });
    
    message.save((err) => {
      if (err) {
        console.log(err);
      }

      io.in(room).emit('chat:message', newMessage);
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