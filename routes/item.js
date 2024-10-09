const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item');
const validation = require('../middleware/validate');
// git hub authenticate
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', itemController.getAll);

router.get('/:id', itemController.getSingle);

router.post('/', isAuthenticated, validation.saveItem, itemController.createItem);

router.put('/:id', isAuthenticated, validation.saveItem, itemController.updateItem);

router.delete('/:id', isAuthenticated, itemController.deleteItem);

module.exports = router;
