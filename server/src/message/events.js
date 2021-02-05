const Message = require('./db/model');

module.exports = (io) => {
  const joinChat = function (chatId) { 
    const room = idToRoom(chatId)
    console.log(`joining ${room}`);
    this.join(room);
  };
  
  const leaveChat = function (chatId) {
    const room = idToRoom(chatId)
    console.log(`leaving ${room}`);
    this.leave(room);
  };
  
  const sendMessage = function (chatId, newMessage) {
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

  return {
    joinChat,
    leaveChat,
    sendMessage
  }
}

function idToRoom(chatId) {
  return `channel:${chatId}`
}