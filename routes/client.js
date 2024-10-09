const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');
const validation = require('../middleware/validate');

// git hub authenticate
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', clientController.getAll);

router.get('/:id', clientController.getSingle);

router.post('/', isAuthenticated, validation.saveClient, clientController.createClient);

router.put('/:id', isAuthenticated, validation.saveClient, clientController.updateClient);

router.delete('/:id', isAuthenticated ,clientController.deleteClient);

module.exports = router;
