const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema ({
    foodName: {
        type: String,
        required: true
    },
    foodAllergen: {
        type: String,
        enum: ['DF', 'VG', 'VE', 'NF'],
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
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Food', foodSchema);