const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');
const validation = require('../middleware/validate');

router.get('/', clientController.getAll);

router.get('/:id', clientController.getSingle);

router.post('/', validation.saveClient, clientController.createClient);

router.put('/:id', validation.saveClient, clientController.updateClient);

router.delete('/:id', clientController.deleteClient);

module.exports = router;
