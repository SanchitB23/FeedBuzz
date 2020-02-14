const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false},
  hasOpened: {type: Boolean, default: false},
  timesOpened: {type: Number, default: 0}
});
module.exports = recipientSchema;
