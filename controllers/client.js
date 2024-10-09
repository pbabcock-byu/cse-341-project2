const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Client']
    mongodb
        .getDb()
        .db()
        .collection('client_details')
        .find()
        .toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
    //#swagger.tags=['Client']
    const userId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to find a Client.');
    }
    mongodb
        .getDb()
        .db()
        .collection('client_details')
        .find({ _id: userId })
        .toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const createClient= async (req, res) => {
    //#swagger.tags=['Client']
    // No need to vailid this here as it was validated by the middle ware
    const client = {
        clientCode: req.body.clientCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAdd: req.body.streetAdd,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country
    };
    const response = await mongodb.getDb().db().collection('client_details').insertOne(client);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating a new Client.');
    }
};

const updateClient = async (req, res) => {
    //#swagger.tags=['Client']
    // Validating to make sure the user entered a valid Mongdb ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a Client.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const client = {
        clientCode: req.body.clientCode,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        streetAdd: req.body.streetAdd,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('client_details')
        .replaceOne({ _id: userId }, client);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the client.');
    }
};

const deleteClient = async (req, res) => {
    //#swagger.tags=['Client']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to delete a client.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('client_details').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the client.');
    }
};

module.exports = {
  getAll,
  getSingle,
  createClient,
  updateClient,
  deleteClient
};
