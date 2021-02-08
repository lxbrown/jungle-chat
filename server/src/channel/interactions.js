const model = require('./db/model');

module.exports = () => {
  const createChannel = (short_name, display_name, description) => {
    const channel = new model({
      short_name: short_name,
      display_name: display_name,
      description: description
    });

    return model(channel).save();
  };

  const getAll = () => {
    return model.find({}).
      lean().
      exec();
  };

  const getByShortName = (short_name) => {
    return model.findOne({short_name: short_name}).
      lean().
      exec();
  };

  return {
    createChannel,
    getAll,
    getByShortName
  }
}