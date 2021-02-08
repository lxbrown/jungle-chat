const model = require('./db/model');

const channelInteractions = require('../channel/interactions')();
const userInteractions = require('../user/interactions')();

module.exports = () => {
  const sendMessage = (socket_id, channel_id, message_body) => {
    const promises = Promise.all([userInteractions.getUsername(socket_id), channelInteractions.getByShortName(channel_id)]);

    return promises.then(([display_name, channel]) => {
      const message = new model({
        socket_id: socket_id,
        channel_id: channel_id,
        display_name: display_name,
        message_body: message_body
      });

      //Only persist messages for known rooms
      if (channel === null) {
        return message;
      }

      return model(message).save();
    });
  };

  const getByChannel = (channel, limit) => {
    return model.find({
      channel_id: channel
    }).
      limit(limit).
      sort('-created_at').
      exec();
  };

  return {
    sendMessage,
    getByChannel
  }
}