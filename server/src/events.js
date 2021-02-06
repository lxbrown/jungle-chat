const registerMessageEvents = require('./message/events');
const registerChannelEvents = require('./channel/events');
const registerUserEvents = require('./user/events');

module.exports = (io) => {
  const onConnection = socket => {
    console.log('socket connection established');
    registerMessageEvents(io, socket);
    registerChannelEvents(io, socket);
    registerUserEvents(io, socket);

    socket.on('disconnect', () => { console.log('socket connection ended') });
  }

  io.on('connection', onConnection);
}