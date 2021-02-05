const model = require('./db/model');

module.exports = () => {
    const sendMessage = (socket_id, display_name, channel_id, message_body) => {
        return new Promise((resolve, reject) => {
            if (socket_id === undefined || channel_id === undefined) {
                reject(new Error('Message validation failed'));
            }

            const message = new model({
                socket_id: socket_id,
                channel_id: channel_id,
                display_name: display_name,
                message_body: message_body
            })

            model(message).save((err) => {
                if (err) {
                  reject(err);
                }
                resolve(message);
            });
        });
    };

    const getByChannel = (channel, limit) => {
        return new Promise((resolve, reject) => {
            model.find({
                channel_id: channel
            }).
            limit(limit).
            sort('-_id').
            exec((err, messages) => {
                if (err) {
                    reject(err);
                }
                resolve(messages);
            });
        })
    };

    return {
        sendMessage,
        getByChannel
    }
}