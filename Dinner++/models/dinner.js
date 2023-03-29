const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Need to fix eventTimeStart and End type to allow MongoDB to accept time
const dinnerSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },

    eventDate: {
        type: Date,
        required: true
    },
    // eventTimeStart: {
    //     type: Date,
    //     required: true
    // },

    // eventTimeEnd: {
    //     type: Date,
    //     required: true
    // },

    eventHost: {
        type: String,
        required: true
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
    }]}, {
        timestamps: true
});





module.exports = mongoose.model('Dinner', dinnerSchema)