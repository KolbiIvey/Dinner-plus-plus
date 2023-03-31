// created a dinner.js in controllers
const Dinner = require('../models/dinner');

const openai = require('../config/gpt');

function dateConverter(dateObj) {
    if (!dateObj){
        return
    }
    const startDate = dateObj
    let day = startDate.getDate();
    let month = startDate.getMonth() + 1;
    let year = startDate.getFullYear()
    let hour = startDate.getHours();
    let minute = startDate.getMinutes();
    let newArray = [day, month, hour, minute]
    newArray.forEach((digits, index)=> {
        let digitString = digits.toString();
        if (digitString.length === 1) {
            let newNum =  `0${digitString}`
            newArray.splice(index, 1, newNum)
        }
    })
    let format1 = `${newArray[1]}/${newArray[0]}/${year} ${newArray[2]}:${newArray[3]}`
    return format1;
}


async function index(req, res) {   
    try {
        const dinners = await Dinner.find({});
        await dinners.forEach(dinner => { 
            const startDate = dateConverter(dinner.eventStartDate);
            const endDate = dateConverter(dinner.eventEndDate);
            Object.assign(dinner, {'start':startDate,'end' :endDate})
            console.log(dinner)
        })
        res.render('dinners/index', { data:{
            title: 'Dinner Dates',
            dinnerData: dinners,
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
        // // openai //////////////
        const evtName = req.body.eventName
        const evtHost = req.body.eventHost
        const prompt = `Write an invitation for ${evtName} hosted by ${evtHost} in less than 200 characters.`
        const params = {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.5,
            n: 1,
        };
        const response = await openai.createCompletion(params);
        const gptResponse = await response.data.choices[0]["text"]
        console.log(gptResponse )
        console.log(typeof gptResponse )
        // // openai //////////////
        req.body['eventStartDate'] = start
        req.body['eventEndDate'] = end
        req.body['eventHost'] = req.user.name
        req.body['eventDesc'] = gptResponse
        const dinner = await new Dinner(req.body);
        await dinner.save();
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
    try{
        const dinner = await Dinner.findById(req.params.id).populate('foodList').populate('attendeeList');
        const startDate = dateConverter(dinner.eventStartDate);
        const endDate = dateConverter(dinner.eventEndDate);
        res.render('dinners/show', { 
            title: dinner.eventName,
            dinner: dinner,
            start: startDate,
            end: endDate})
    } catch(err){
        if (err.response){
            console.log(err.response.status);
            console.log(err.response.data);
        }
        res.redirect('/dinners/new');
    }
}




module.exports = {
    index,
    new: newDinnerdate,
    create,
    show,
    dateConverter
}