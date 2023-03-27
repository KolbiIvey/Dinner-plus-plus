const express = require('express');
const router = express.Router();
const foodsCtrl = require('../controllers/foods');

//GET /dinners/foods/new
router.get('/new', foodsCtrl.new);






module.exports = router;