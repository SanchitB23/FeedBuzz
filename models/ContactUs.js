const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactUsSchema = new Schema({
  name: String,
  email: String,
  message: String,
  date: Date
});

mongoose.model('contactUs', contactUsSchema); //2 args = loading something in Mongoose (~Post)

