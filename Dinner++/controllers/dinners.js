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

async function create(req, res) {
    try {
        const dinner = new Dinner(req.body);
        await dinner.save();
        console.log(dinner);
        res.redirect('/dinners') //temp code, after show.ejs is coded out
        //redirect to '/dinners/${dinner._id}
    } catch (err) {
        res.redirect('/dinners/new');
    }
}











module.exports = {
    index,
    new: newDinnerdate,
    create
}