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
        const foodItem = {
            foodName: req.body.foodName,
            foodAllergen: req.body.foodAllergen,
            feeds: null,
            review: null,
            recipe: null,
            creator: req.user._id,
        }

        const meal = await Food.create(foodItem);
        console.log('this is req.body', req.body)
        console.log(meal)
        //findbyid error use diff method?
        const dinner = await Dinner.findById(req.params.id)
        const user = await User.findById(req.user._id)
        const newMeal = await Food.findById(meal._id)
        dinner.foodList.push(newMeal._id)
        if (dinner.attendeeList.findIndex((attendee) => attendee.toString() === req.user.id) < 0){
            dinner.attendeeList.push(user._id)
            await user.save()
        }
        user.foodData.push(newMeal._id)
        await dinner.save();
        await user.save();
        await meal.save()
        res.redirect(`${dinner._id}`)
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function editFood(req, res) {
    try { 
        const user = await User.findById(req.user._id).populate('foodData');
        const userFoodData = user.foodData
        const foodItem = await userFoodData.find(food => food._id.toString() === req.params.idFood)
        if (!foodItem) res.redirect(`/dinners/${req.params.id}`)
        const dinner = await Dinner.findById(req.params.id)
        res.render('foods/edit', {
            title: 'Edit Food',
            food: foodItem,
            dinner: dinner,
    })
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function updateFood(req, res) {
    try {
    const food = await Food.findById(req.params.idFood)
    Object.assign(food, req.body)
    res.redirect(`/dinners/${req.params.id}`)
    await food.save();
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

async function deleteFood(req, res){
    try{
        const user = await User.findById(req.user.id)
        const dinner = await Dinner.findById(req.params.id)
        user.foodData.remove(req.params.idFood)
        dinner.foodList.remove(req.params.idFood)
        await user.save()
        await dinner.save()
        await Food.deleteOne({ _id: req.params.idFood})
        res.redirect(`/dinners/${req.params.id}`)
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }

}



module.exports = {
    new: newFood,
    createFood,
    editFood,
    updateFood,
    deleteFood
}