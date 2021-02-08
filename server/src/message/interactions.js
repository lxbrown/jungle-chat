const model = require('./db/model');

const channelInteractions = require('../channel/interactions')();
const userInteractions = require('../user/interactions')();

module.exports = () => {
  const sendMessage = (socket_id, channel_id, message_body) => {
    return new Promise((resolve, reject) => {
      if (socket_id === undefined || channel_id === undefined) {
        reject(new Error('Message validation failed'));
      }

      const promises = Promise.all([userInteractions.getUsername(socket_id), channelInteractions.getByShortName(channel_id)]);

      promises.then(([display_name, channel]) => {
        const message = new model({
          socket_id: socket_id,
          channel_id: channel_id,
          display_name: display_name,
          message_body: message_body
        });

        if (channel === null) {
          resolve(message);
        }

        //Only persist messages for known rooms
        model(message).save((err) => {
          if (err) {
            reject(err);
          }
          resolve(message);
        });
      }, err => {
        reject(err);
      });
    });
  };

  const getByChannel = (channel, limit) => {
    return new Promise((resolve, reject) => {
      model.find({
        channel_id: channel
      }).
      limit(limit).
      sort('-created_at').
      exec((err, messages) => {
        if (err) {
          reject(err);
        }
        resolve(messages);
      });
    });
  };

  return {
    sendMessage,
    getByChannel
  }
}