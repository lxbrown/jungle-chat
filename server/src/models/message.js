const mongoose = require('mongoose');

const singleMessageSchema = new mongoose.Schema({       //Message history, stored by channel_id
    socket_id: String,                                  //Will be updated to "user_id: Schema.Types.ObjectId" when User schema added
    channel_id: { type: String, index: true },                                 //Temp. Instead of subdocs
    display_name: String,                               //Will be removed when User schema added
    message_body: String,                                       //Message text
    created_at: { type: Date, default: Date.now },      //When the message was received
});

// const messageSchema = new mongoose.Schema({
//     channel_id: mongoose.Schema.Types.ObjectId,
//     messages: [singleMessageSchema],
// });

module.exports = mongoose.model('Message', singleMessageSchema);