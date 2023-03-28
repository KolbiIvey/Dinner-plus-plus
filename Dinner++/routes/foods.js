const express = require('express');
const router = express.Router();
const foodsCtrl = require('../controllers/foods');

//GET /dinners/foods/new
router.get('/dinners/:id/foods/new', foodsCtrl.new);

// POST / create
router.post('/dinners/:id', foodsCtrl.createFood)

//



module.exports = router;