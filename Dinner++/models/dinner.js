const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventHost: {
        type: String,
        required: true
    },
    attendeeList: {
        type: Array,
        // add ref here for Oauth [ref]
    },
    eventAttendeeNum: {
        type: Number
    },
    foodList: {
        type: Array,
        //add embedded data here [embedded]
    }}, {
        timestamps: true
});



module.exports = mongoose.model('Dinner', dinnerSchema)