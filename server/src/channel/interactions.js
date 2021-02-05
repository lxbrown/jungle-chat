const model = require('./db/model');

module.exports = () => {
  const createChannel = (short_name, display_name, description, persistent) => {
    return new Promise((resolve, reject) => {
      if (short_name === undefined || persistent === undefined) {
        reject(new Error('Message validation failed'));
      }

      const channel = new model({
        short_name: short_name,
        display_name: display_name,
        description: description,
        persistent: persistent
      })

      model(channel).save((err) => {
        if (err) {
          reject(err);
        }
        resolve(channel);
      });
    });
  };

  const getAll = () => {
    return new Promise((resolve, reject) => {
      model.find({}).
        exec((err, messages) => {
          if (err) {
            reject(err);
          }
          resolve(messages);
        });
    })
  };

  return {
    createChannel,
    getAll
  }
}