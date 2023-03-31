var express = require('express');
var router = express.Router();
const passport = require('passport');

// GET for google authentication
router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
    }
));

// Google Oauth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// Google Oauth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
