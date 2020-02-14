const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {type: String},
  name: {type: String},
  email: {type: String},
  createdAt: {type: Date},
  credits: {type: Number, default: 1},
  companyName: {type: String},
});

mongoose.model('users', userSchema); //2 args = loading something in Mongoose (~Post)
