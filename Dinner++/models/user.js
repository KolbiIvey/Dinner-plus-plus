const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Are there other values that come back from google?
// Is this where we also need to include google calendar schema?

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