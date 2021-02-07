const model = require('./db/model');

module.exports = () => {
  const createChannel = (short_name, display_name, description, persistent) => {
    return new Promise((resolve, reject) => {
      if (short_name === undefined || short_name === '') {
        reject(new Error('Message validation failed'));
      }

      const channel = new model({
        short_name: encodeURI(short_name),
        display_name: display_name,
        description: description
      });

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
        lean().
        exec((err, channels) => {
          if (err) {
            reject(err);
          }
          resolve(channels);
        });
    })
  };

  const getByShortName = (short_name) => {
    return new Promise((resolve, reject) => {
      model.findOne({short_name: short_name}).
        lean().
        exec((err, channel) => {
          if (err) {
            reject(err);
          }
          resolve(channel);
        });
    })
  };

  return {
    createChannel,
    getAll,
    getByShortName
  }
}