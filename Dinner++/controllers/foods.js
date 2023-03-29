const Food = require('../models/food');
const Dinner = require('../models/dinner');
const User = require('../models/user');
// const user = require('../models/user');



async function newFood(req, res) {
    const dinner = await Dinner.findById(req.params.id)
    // may need to add async function for seeded data
    res.render(`foods/new`, {
        title: 'Add A New Food', 
        dinner: dinner});
}

async function createFood(req, res){
    try {
        const meal = await Food.create(req.body);
        //findbyid error use diff method?
        const dinner = await Dinner.findById(req.params.id)
        const user = await User.findById(req.user._id)
        const newMeal = await Food.findById(meal._id)
        dinner.foodList.push(newMeal._id)
        user.foodData.push(newMeal._id)
        res.redirect(`${dinner._id}`)
        await dinner.save();
        await user.save();
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function editFood(req, res) {
    const user = await User.findById(req.user._id)
    const userFoodData = await User.foodData.findById(req.params.idFood)
    console.log(userFoodData)
    const dinner = await Dinner.findById(req.params.id)
    const food = await Food.findById(req.params.id)
    res.render('foods/edit', {
        title: 'Edit Food',
        food: food,
    })
    // res.redirect(`dinners/${dinner._id}/foods/${food._id}`, { title: 'Edit Food', errorMsg: ''});

}

// drafted an asyn function here.
// async function createFood(req, res){
//     try {
//         Promise.resolve().then(function() {
//         const meal = Food.create(req.body);
//         return meal
//     }).then(async function(result){
//         const dinner = await Dinner.findById(req.params.id)
//         dinner.foodList.push(result._id)
//         return dinner
//     }).then(async function(result){
//         res.redirect(`${result._id}`)
//     })
//     } catch(err){
//         console.log(err);
//         res.status(500).send(err.message);
//     }

// }



module.exports = {
    new: newFood,
    createFood,
    editFood,
}