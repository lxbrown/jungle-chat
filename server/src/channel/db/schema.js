const mongoose = require('mongoose');

module.exports = new mongoose.Schema({                    //Metadata about the channel
  short_name: { type: String, required: true, unique: true}, //Key to use in the channel's chat URL
  display_name: String,                                   //Name to display on screen
  description: String,                                    //Description of channel
  persistent: Boolean,                                    //Do we persist messages for this channel, or is it transient
});