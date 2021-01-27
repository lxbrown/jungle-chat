module.exports = (io) => {
  const joinChat = function () {
    const chatId = chatIdFromSocket(this);
    console.log(`joining ${chatId}`);
    this.join(chatId);
  };
  
  const leaveChat = function () {
    const chatId = chatIdFromSocket(this);
    console.log(`leaving ${chatId}`);
    this.leave(chatId);
  };
  
  const sendMessage = function (message) {
    const chatId = chatIdFromSocket(this);
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