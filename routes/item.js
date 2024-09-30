const express = require('express');
const router = express.Router();

const clientController = require('../controllers/item');
const validation = require('../middleware/validate');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getSingle);

router.post('/', validation.saveItem, clientController.createItem);

router.put('/:id', validation.saveItem, clientController.updateItem);

router.delete('/:id', clientController.deleteItem);

module.exports = router;
