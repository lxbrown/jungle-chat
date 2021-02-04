const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({             //Metadata about the channel
    display_name: String,                               //Name to display on screen
    description: String,                                //Description of channel
});

module.exports = mongoose.model('Channel', channelSchema);