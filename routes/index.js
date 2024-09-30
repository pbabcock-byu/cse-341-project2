const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

//for the cleint
router.use('/client', require('./client'));

//for the Items
router.use('/item', require('./item'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World, This is home router');
  });



module.exports = router;
