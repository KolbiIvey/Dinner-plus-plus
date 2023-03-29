const express = require('express');
const router = express.Router();
const foodsCtrl = require('../controllers/foods');
const ensureLoggedIn = require('../config/ensureLoggedIn');


//GET /dinners/foods/new
// fix router.get to reroute to the bring a dish page
router.get('/dinners/:id/foods/new', ensureLoggedIn, foodsCtrl.new);

// POST / create
router.post('/dinners/:id', ensureLoggedIn, foodsCtrl.createFood)

//GET edit foods link /dinner/:id/foods/:idFood/edit
router.get('/dinners/:id/foods/:idFood/edit', ensureLoggedIn, foodsCtrl.editFood)

//PUT /update /foods/:id
router.put('/dinners/:id/foods/:idFood', foodsCtrl.updateFood)

module.exports = router;