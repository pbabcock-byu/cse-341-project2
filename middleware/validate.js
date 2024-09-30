const validator = require('../helpers/validate');

const saveClient = (req, res, next) => {
  const validationRule = {
    clientCode: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    phoneNumber: 'required|string',
    streetAdd: 'required|string',
    city: 'required|string',
    state: 'required|string',
    postalCode: 'required|string',
    country: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveItem = (req, res, next) => {
  const validationRule = {
    foodId: 'required|string',
    name: 'required|string',
    category: 'required|string',
    description: 'required|string',
    price: 'required|numeric',
    supplier: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveClient,
  saveItem
};
