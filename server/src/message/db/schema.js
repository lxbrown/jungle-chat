const mongoose = require('mongoose');

const schema = new mongoose.Schema({          //Message history, stored by channel_id
    socket_id: String,                            //Will be updated to "user_id: Schema.Types.ObjectId" when User schema added
    channel_id: { type: String, required: true },  //short_name of the channel
    display_name: String,                         //Will be removed when User schema added
    message_body: String,                         //Message text
    created_at: { type: Date, default: Date.now },//When the message was received
});

schema.index({ channel_id: 1, created_at: -1});

module.exports = schema;

//TODO: investigate subdocuments
// const messageSchema = new mongoose.Schema({
//   channel_id: mongoose.Schema.Types.ObjectId,
//   messages: [singleMessageSchema],
// });