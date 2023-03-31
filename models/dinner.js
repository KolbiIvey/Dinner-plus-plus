const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventStartDate: {
        type: Date,
        required: true
    },
    eventEndDate: {
        type: Date,
        required: true
    },
    eventHost: {
        type: String,
        required: true
      },
    eventLocation: {
        type: String,
        required: false
    },
    eventDesc: {
        type: String,
        required: false
    },
    attendeeList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    eventAttendeeNum: {
        type: Number
    },
    foodList: [{
        type: Schema.Types.ObjectId,
        ref: 'Food'
      }],
    },{
        timestamps: true
});


module.exports = mongoose.model('Dinner', dinnerSchema)