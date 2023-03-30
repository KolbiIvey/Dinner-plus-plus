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
        const startDate = req.body.eventStartDate
        const startTime = req.body.eventStartTime;
        const endDate = req.body.eventEndDate
        const endTime = req.body.eventEndTime;

        const start = `${startDate}T${startTime}`
        const end = `${endDate}T${endTime}`

        req.body['eventStartDate'] = start
        req.body['eventEndDate'] = end
        req.body['eventHost'] = req.user.name
        console.log(req.body)
        const dinner = new Dinner(req.body);
        await dinner.save();
        console.log(dinner)

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
    // new code
    const query = [{
        path: 'foodList'
    },{
        path: 'attendeeList',
    }]

    //
    const dinner = await Dinner.findById(req.params.id).populate(query);
    // const regx = //gi

    //  let stringDate =  dinner.eventStartDate.toString()
    //  let found = stringDate.match(regx)
    // console.log(found)
    const startDate = dateConverter(dinner.eventStartDate);
    const endDate = dateConverter(dinner.eventEndDate);
    dinner['startDateStrFormat'] = startDate;
    dinner['endDateStrFormat'] = endDate;
    console.log(startDate)
    console.log(endDate)
    console.log(dinner);
    res.render('dinners/show', { 
        title: dinner.eventName,
        dinner: dinner})
}

function dateConverter(dateObj) {
    const startDate = dateObj
    let day = startDate.getDate();
    let month = startDate.getMonth() + 1;
    let year = startDate.getFullYear()
    let hour = startDate.getHours();
    let minute = startDate.getMinutes();
    console.log(`
    day: ${day}
    month: ${month + 1}
    year: ${year}
    hour: ${hour}
    minute: ${minute}
    ${month}/${day}/${year} ${hour}:${minute}
    `)
    let format1 = ` ${month}/${day}/${year} ${hour}:${minute}`
    return format1;
}



module.exports = {
    index,
    new: newDinnerdate,
    create,
    show,
    dateConverter
}