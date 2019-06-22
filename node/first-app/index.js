const express = require('express');
const logger = require('./logger');
const authenticate = require('./authenticator');
const Joi = require('joi');
const app = express();      // top level function exported by express module

app.use(express.json());    // adding middleware to enable body parsing
app.use(logger);
app.use(authenticate);
app.use(express.static('public'));

const customers = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
    { id: 3, name: 'Customer 3' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(customer => customer.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send('Customer not found');
    };
    res.send(customer);
});

app.post('/api/customers', (req, res) => {
    // if valid
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0]);
    }

    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(customer);
    res.send(customer);
});

app.put('/api/customers/:id', (req, res) => {
    // if preset
    const customer = customers.find(cust => cust.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send('Customer not found');
    }

    // if valid
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0]);
    }

    // update
    customer.name = req.body.name;

    // return
    res.send(customer);
});

app.delete('/api/customers/:id', (req, res) => {
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
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(customer, schema);
}

app.listen(3000, () => console.log('Server running on port 3000...'));