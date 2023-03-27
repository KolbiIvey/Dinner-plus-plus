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
// Path to individual dinner details
//GET /dinners/:id
router.get('/:id', dinnersCtrl.show);



module.exports = router;