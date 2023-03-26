// created a dinner.js in controllers
const Dinner = require('../models/dinner');




async function index(req, res) {   
    try {
        const dinners = await Dinner.find({});
        res.render('dinners/index', { data:{
            'title': 'Dinner Dates',
            'dinnerData': dinners
    }})
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

function newDinnerdate( req, res) {
    //render an error message if create function fails
    res.render('dinners/new', { title: 'Add Dinner Date', errorMsg: ''});
}












module.exports = {
    index,
    new: newDinnerdate
}