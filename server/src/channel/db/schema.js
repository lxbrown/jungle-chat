const mongoose = require('mongoose');

module.exports = new mongoose.Schema({                                    //Metadata about the channel
  short_name: { type: String, required: true, unique: true, index: true}, //Key to use in the channel's chat URL
  display_name: String,                                                   //Name to display on screen
  description: String,                                                    //Description of channel
  created_at: { type: Date, default: Date.now },                          //When the message was created
});