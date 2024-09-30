const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=['Items']
    mongodb
        .getDb()
        .db()
        .collection('item_details')
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
    //#swagger.tags=['Items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to find a Client.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('item_details')
        .find({ _id: userId })
        .toArray((err, result) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};


const createItem= async (req, res) => {
    //#swagger.tags=['Items']
    // No need to vailid this here as it was validated by the middle ware
    const item = {
        foodId: req.body.foodId,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        supplier: req.body.supplier
    };
    const response = await mongodb.getDb().db().collection('item_details').insertOne(item);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating a new Item.');
    }
};

const updateItem = async (req, res) => {
    //#swagger.tags=['Items']
    // Validating to make sure the user entered a valid Mongdb ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update an Item.');
    }
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const item = {
        foodId: req.body.foodId,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        supplier: req.body.supplier
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('item_details')
        .replaceOne({ _id: userId }, item);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating an Item.');
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['Items']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to delete an item.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('item_details').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting an item.');
    }
};

module.exports = {
  getAll,
  getSingle,
  createItem,
  updateItem,
  deleteItem
};