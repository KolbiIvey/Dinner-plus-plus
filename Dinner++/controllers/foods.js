const Food = require('../models/food')
const Dinner = require('../models/dinner');



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
        const dinner = await Dinner.findById(req.params.id)
        // unable to still push the new meal to the dinner.foodList array
        // need to incorporate an async ?
        console.log(meal._id) // this is a 'new ObjectId('93847ja89234 hash')
        const newMeal = await Food.findById(meal._id)
        console.log(newMeal) // this is the object itself.
        console.log(dinner.foodList)
        dinner.foodList.push(newMeal._id)
        console.log(dinner.foodList)
        res.redirect(`${dinner._id}`)
        await dinner.save();
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
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
    createFood
}