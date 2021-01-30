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
  
  const sendMessage = function (chatId, message) {
    const room = idToRoom(chatId)
    console.log(`messaging ${room}`)
    io.in(room).emit('chat:message', message);
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