const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {type: String},
  createdAt: {type: Date}
});

mongoose.model('users', userSchema); //2 args = loading something in Mongoose (~Post)
