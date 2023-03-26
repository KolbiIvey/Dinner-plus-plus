const express = require('express');
const router = express.Router();

const dinnersCtrl = require('../controllers/dinners')

//GET /dinners/index
router.get('/index', dinnersCtrl.index);
//GET /dinners
router.get('/', dinnersCtrl.index);
//GET /new 
router.get('/new', dinnersCtrl.new);
//POST /dinners
router.post('/', dinnersCtrl.create);




module.exports = router;