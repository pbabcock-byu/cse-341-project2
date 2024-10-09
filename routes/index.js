const express = require('express');
const passport = require('passport'); 
const router = express.Router();

router.use('/', require('./swagger'));

//for the cleint
router.use('/client', require('./client'));

//for the Items
router.use('/item', require('./item'));

//router.get('/', (req, res) => {
//    //#swagger.tags=['Hello World']
//    res.send('Hello World, This is home router');
//  });


// can use this to log into get hub
router.get('/login', passport.authenticate('github'), (req, res) => {});

// use this to clear our session and remove access  
router.get('/logout', function(req, res, next) {
  req.logout(function(err){
    if (err) { return next(err);}
    res.redirect('/');
  });
});

module.exports = router;
