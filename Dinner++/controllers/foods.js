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
    try { const user = await User.findById(req.user._id).populate('foodData');
    const userFoodData = user.foodData
    const foodItem = await userFoodData.find(food => food._id.toString() === req.params.idFood)
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
        const user = await User.findOne(req.user.id)
        const dinner = await Dinner.findOne(req.params.id)
        const food = await Food.findOne(req.params.idFood)
        console.log("See the code below!")
        console.log(user.foodData)
        console.log(dinner.foodList)

        const idxUser = user.foodData.findIndex((food) => food._id === req.params.idFood)
        user.foodData.splice(idxUser, 1)

        const idxDinner = dinner.foodList.findIndex((food) => food._id === req.params.idFood)
        dinner.foodList.splice(idxDinner, 1)

        await user.save()
        await dinner.save()

        console.log(user.foodData)
        console.log(dinner.foodList)

        console.log()
        // const idx = todos.findIndex(todo => todo.id === id);
        // todos.splice(idx, 1);
        await Food.findOneAndDelete(req.params.idFood)

        //await food.save()
        res.redirect(`/dinners/${req.params.id}`)


    }catch(err){
        console.log(err);
        res.status(500).send(err.message);
        console.log("This will run if it doesn't work!")
    }

}

// const Food = require('../models/food');
// const Dinner = require('../models/dinner');
// const User = require('../models/user');


// function update(id, updatedFood) {
//     id = parseInt(id);
//     const todo = todos.find(todo => todo.id === id);
//     // todo.todo = updatedTodo.todo;
//     Object.assign(todo, updatedTodo)
//   }



// res.redirect(`dinners/${dinner._id}`);
// `, { title: 'Edit Food', errorMsg: ''}

// drafted an asyn function here."?/'12"
// async function createFood(req, res){=[']p-;+{"}"}
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
    updateFood,
    deleteFood
}