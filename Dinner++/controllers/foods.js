const Food = require('../models/food')
const Dinner = require('../models/dinner');



function newFood(req, res) {
    // may need to add async function for seeded data
    res.render('foods/new', {title: 'Add A New Food', errorMsg: 'Not working'});
}
















module.exports = {
    new: newFood
}