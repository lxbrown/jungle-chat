module.exports = (io) => {
  const joinChat = function (chatId) {
    console.log(`joining ${chatId}`);
    this.join(chatId);
  };
  
  const leaveChat = function (chatId) {
    console.log(`leaving ${chatId}`);
    this.leave(chatId);
  };
  
  const sendMessage = function (chatId, message) {
    console.log(`messaging ${chatId}`)
    io.in(chatId).emit('chat:message', message);
  };

  return {
    joinChat,
    leaveChat,
    sendMessage
  }
}

function chatIdFromSocket(socket) {
  const { chatId } = socket.handshake.query;
  return chatId
}