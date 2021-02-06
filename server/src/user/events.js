
const interactions = require('./interactions')();

module.exports = (io, socket) => {
  //TODO: right now the pool of usernames is global, but the
  //assignment is done on joining or leaving a specific channel.
  //Pass chat id to interactions, so it can find one free
  //for the user's current channel
  const getUsername = (chatId, callback) => {
    interactions.getUsername(socket.id).then(username => {
      callback(username);
    });
  };
  
  const closeUsername = chatId => {
    interactions.closeUsername(socket.id)
  };
  
  socket.on('chat:join', getUsername);
  socket.on('chat:leave', closeUsername);

  return;
}