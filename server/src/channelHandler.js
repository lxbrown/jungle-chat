module.exports = (io) => {
  const ROOM = 'home:launch'
  const CHANNEL_PREFIX = 'channel:';

  const joinLaunch = function () {
    console.log(`joining ${ROOM} and asking for channels`);
    this.join(ROOM);
    refreshChannels();
  };
  
  const leaveLaunch = function () {
    console.log(`leaving ${ROOM}`);
    this.leave(ROOM);
  };
  
  const refreshChannels = function () { //TODO: only refresh if > 1 in home:launch room
    const room = io.sockets.adapter.rooms[ROOM]
    if (room && room.size == 0) {
      return;
    }
    console.log(`updating ${ROOM}`);
    let channels = []
    io.sockets.adapter.rooms.forEach((value, key, map) => {
      if (!key.startsWith(CHANNEL_PREFIX)) {
        return
      }
      const chatId = key.replace(CHANNEL_PREFIX, '');
      channels.push(channel = {
        id: chatId,
        name: chatId,
        activeUsers: value.size
      })
    })
    io.in(ROOM).emit('launch:update', channels);
  };

  return {
    joinLaunch,
    leaveLaunch,
    refreshChannels
  }
}