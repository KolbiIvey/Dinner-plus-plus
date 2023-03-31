const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    foodData: [{
      type: Schema.Types.ObjectId,
      ref: 'Food'
    }],
    email: String,
    avatar: String
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);