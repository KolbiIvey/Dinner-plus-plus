// created a dinner.js in controllers
const Dinner = require('../models/dinner');

const openai = require('../config/gpt');


async function index(req, res) {   
    try {
        const dinners = await Dinner.find({});
        res.render('dinners/index', { data:{
            title: 'Dinner Dates',
            dinnerData: dinners
    }})
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

function newDinnerdate(req, res) {
    //render an error message if create function fails
    res.render('dinners/new', { title: 'Add Dinner Date', errorMsg: ''});
}

async function create(req, res) {
    try {
        const dinner = new Dinner(req.body);
        await dinner.save();
        console.log(dinner);

        // // openai
    
        // const evtName = req.body.eventName
        // const evtHost = req.body.eventHost
        // const prompt = `Write an invitation for ${evtName} hosted by ${evtHost} in less than 200 characters.`
        // console.log(prompt)
        // const params = {
        //     model: "text-davinci-003",
        //     prompt: prompt,
        //     temperature: 0.5,
        //     n: 1,
        // };

        // console.log(params)
        // const response = await openai.createCompletion(params);
        // console.log(response)
        // console.log(response.data.choices[0].text)
        // //return response.choices[0].text.trim();

        res.redirect('/dinners') //temp code, after show.ejs is coded out
        //redirect to '/dinners/${dinner._id}
    } catch (err) {
        if (err.response){
            console.log(err.response.status);
            console.log(err.response.data);
        }
        res.redirect('/dinners/new');
    }
}

async function show(req, res) {
    const dinner = await Dinner.findById(req.params.id)
    res.render('dinners/show', { 
        title: dinner.eventName,
        dinner: dinner })
}

module.exports = {
    index,
    new: newDinnerdate,
    create,
    show,
}