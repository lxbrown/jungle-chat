module.exports = (io, socket) => {
  const ROOM = 'home:launch'
  const CHANNEL_PREFIX = 'channel:';

  const joinLaunch = () => {
    console.log(`joining ${ROOM} and asking for channels`);
    socket.join(ROOM);
    refreshChannels();
  };
  
  const leaveLaunch = () => {
    console.log(`leaving ${ROOM}`);
    socket.leave(ROOM);
  };
  
  const refreshChannels = () => {
    const room = io.sockets.adapter.rooms[ROOM];
    if (room && room.size == 0) {
      return;
    }
    console.log(`updating ${ROOM}`);
    let channels = []
    io.sockets.adapter.rooms.forEach((value, key) => {
      if (!key.startsWith(CHANNEL_PREFIX)) {
        return
      }
      const chatId = key.replace(CHANNEL_PREFIX, '');
      channels.push(channel = {
        short_name: chatId,
        active_users: value.size
      })
    });
    io.in(ROOM).emit('launch:update', channels);
  };
  
  socket.on('launch:join', joinLaunch);
  socket.on('launch:leave', leaveLaunch);
  
  socket.on('chat:join', refreshChannels);
  socket.on('chat:leave', refreshChannels);

  socket.on('disconnect', refreshChannels);

  return;
}