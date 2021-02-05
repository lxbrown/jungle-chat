const model = require('./db/model');

module.exports = () => {
    const sendMessage = message => {
        return new Promise((resolve, reject) => {
            model(message).save();
            resolve(message);
        })
    }

    const getByChannel = (channel, limit) => {
        return new Promise((resolve, reject) => {
            model.find({
                channel_id: channel
            }).
            limit(limit).
            sort('+created_at').
            exec((err, messages) => {
                resolve(messages);
            });
        })
    };

    return {
        sendMessage,
        getByChannel
    }
}