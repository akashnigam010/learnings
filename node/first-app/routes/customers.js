const express = require('express');
const Joi = require('joi');
const route = express.Router();

const customers = [
  {id: 1, name: 'Customer 1'}, 
  {id: 2, name: 'Customer 2'},
  {id: 3, name: 'Customer 3'}
];

route.get('/', (req, res) => {
  res.send(customers);
});

route.get('/:id', (req, res) => {
  const customer =
      customers.find(customer => customer.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).send('Customer not found');
  };
  res.send(customer);
});

route.post('/', (req, res) => {
  // if valid
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0]);
  }

  const customer = {id: customers.length + 1, name: req.body.name};

  customers.push(customer);
  res.send(customer);
});

route.put('/:id', (req, res) => {
  // if preset
  const customer = customers.find(cust => cust.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(404).send('Customer not found');
  }

  // if valid
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0]);
  }

  // update
  customer.name = req.body.name;

  // return
  res.send(customer);
});

route.delete('/:id', (req, res) => {
  // lookup
  const customer = customers.find(cust => cust.id === parseInt(req.params.id));
  if (!customer) {
    return res.send(404).send('Customer not found');
  }

  // delete and return
  customers.splice(customers.indexOf(customer), 1);
  res.send(customer);
});

function validate(customer) {
  const schema = {name: Joi.string().min(3).required()};

  return Joi.validate(customer, schema);
}

module.exports = route;