const express = require('express');
const router = express.Router();

const dinnersCtrl = require('../controllers/dinners')
const ensureLoggedIn = require('../config/ensureLoggedIn');

//GET /dinners/index
router.get('/index', ensureLoggedIn, dinnersCtrl.index);
//GET /dinners
router.get('/', ensureLoggedIn, dinnersCtrl.index);
//GET /new 
router.get('/new',ensureLoggedIn, dinnersCtrl.new);
//POST /dinners
router.post('/', ensureLoggedIn, dinnersCtrl.create);
// Path to individual dinner details
//GET /dinners/:id
router.get('/:id', ensureLoggedIn, dinnersCtrl.show);



module.exports = router;