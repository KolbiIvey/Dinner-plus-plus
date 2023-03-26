const express = require('express');
const router = express.Router();

const dinnersCtrl = require('../controllers/dinners')

//GET /dinners
router.get('/dinners', dinnersCtrl.index)
//GET /new 
router.get('/new', dinnersCtrl.new)













module.exports = router;