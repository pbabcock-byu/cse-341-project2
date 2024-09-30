const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item');
const validation = require('../middleware/validate');

router.get('/', itemController.getAll);

router.get('/:id', itemController.getSingle);

router.post('/', validation.saveItem, itemController.createItem);

router.put('/:id', validation.saveItem, itemController.updateItem);

router.delete('/:id', itemController.deleteItem);

module.exports = router;
