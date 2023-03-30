const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Need to fix eventTimeStart and End type to allow MongoDB to accept time
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


// [{
//     type: Schema.Types.ObjectId,
//     ref: 'Food'
//   }],




module.exports = mongoose.model('Dinner', dinnerSchema)