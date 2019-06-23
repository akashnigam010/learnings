const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticator');
const home = require('./routes/home');
const customers = require('./routes/customers');
const app = express();  // top level function exported by express module

app.use(express.json());  // adding middleware to enable body parsing
app.use(logger);
app.use(authenticate);
app.use(express.static('public'));

app.use('/', home);
app.use('/api/customers', customers);

app.listen(3000, () => console.log('Server running on port 3000...'));