const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema ({
    foodName: {
        type: String,
        required: true
    },
    foodAllergen: {
        type: String,
        enum: ['Dairy Free', 'Vegetarian', 'Vegan', 'Nut Free'],
        required: false
    },
    feeds: {
        type: Number,
        required: false
    },
    review: {
        type: String,
        required: false
    },
    recipe: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Food', foodSchema);