const mongoose = require('mongoose');

module.exports = new mongoose.Schema({  //Metadata about the channel
  display_name: String,                 //Name to display on screen
  description: String,                  //Description of channel
  persistent: Boolean,                  //Do we persist messages for this channel, or is it transient
});