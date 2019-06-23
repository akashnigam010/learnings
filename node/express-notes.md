Express JS
===

REST
---

**REpresentational State Transfer**

- A convention to build the api services
- HTTP services perform CRUD operations using REST
- API - application programming interface - An endpoint
    `http://vidly.com/api/customers`
- We perform CRUD operations on an endpoint using standard HTTP methods
    - **Get**: To read customers
    - **Post**: To create customers
    - **Put**: To update customers
    - **Delete**: To delete customers

RESTFUL Services
---

We expose our resources ex. Customers using simple meaningful address that support various opearations around them such as reading, creating, updating and deleting using standard http methods.

```
GET api/customers
GET api/customer/1
POST api/customers with a new customer object
PUT api/customers/1 with customer object to update
DELETE api/customers/1
```

SOAP
---

**Simple Objcect Access Protocol**

- SOAP is a protocol of for exchanging data between 2 different platforms in a standard manner.
- Includes a WSDL file which describes a particular webservice - request it accepts, response it will provide, encoding, headers etc
- Can have stateful data - messageId, sender, receiver - wsa headers
- Works on XML, therefore heavy payload

**SOAP is a protocol whereas REST is an architectural style**

Express JS
---

Express is a fast and lightweight framework for creating web applications with Nodejs.

- Import dependancy
    `const express = require('express')`;
- Create express app
    `const app = express()`;
- `express()` is a top level function exported by express module to create an Express Application
- `app` is now an express app and we can start using it like

```
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/customers', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(3000, () => console.log('Server running on port 3000...'));
```

Nodemon
---

Monitor node process - restart server etc.

```
npm install -g nodemon
```

Route Params
---

Accessed via `req.params.nameOfParam`

Ex:

```
app.get('api/customers', (req, res) => {
    res.send(customer);
});
app.get('api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('Customer not found');
    res.send(customer);
});
```

Query Params
---

- Optional query strings using `?` and `=`
- Accessed via `req.query.nameOfParam`

Ex:

```
app.get('api/customers', (req, res) => {
    res.send(req.query);
});
```
- For above if the request was `http://localhost:3000/api/customers?sortBy=name`, it will return the json object - `{"sortBy":"name"}`

POST Requests
---

- Enable body parsing in express using middleware
```
const app = express();
app.use(express.json());
```

- Then add a post route handler

```
app.post('/api/customers', (req, res) => {
    const customer = { id: 123, name: req.body.name };
    customers.push(customer);
    res.send(customer);
});
```

- **As a convention, a post call must always return back the new object that was created**

Request Validation Using `Joi`
---

- Instead of manually validating use inputs in a POST call (creating), we can use `Joi`
- create a schema for incoming request object
- validate the request object against the schema using Joi.validate(...)
- Return appropriatly
- As a convention, return 400 (Bad Request) as http status when validation fails along with the message (optional)

```
app.post('/api/customer', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const validationRes = Joi.validate(req.body, schema);

    if (validationRes.error) {
        return res.status(400).send(validationRes.error.details[0]);
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(customer);
    res.send(customer);
});
```

HTTP PUT
---

- For updating an existing object in following steps
    - Check if the object is present, if not, return a 404 - not found
    - If found, check is the schema is valid, if not, return a 400 - bad request
    - If valid, update the course
    - Return the object

```
app.put('/api/customers/:id', (req, res) => {
    // if preset
    const customer = customers.find(cust => cust.id ===parseInt(req.params.id));
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

function validate(customer) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(customer, schema);
}
```

HTTP DELETE
---

- For deleting an existing object in following steps
    - Check if the object is present, if not, return a 404 - not found
    - If found, delete the object
    - Return same object (by convention)

```
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
```

**Important**

- Return from the function whenever we encounter 400 or 404 code block
- Because the code will execute the remaining lines even if the response was returned


Advance Express
===

MiddleWare
---

- Any request from a client goes through a `Request Processing Pipeline` which comprises of one or more middleware functions.
- Middleware functions perform either of the 2 operations:
    - End the request/response cycle by returning a response back to the client
    - Manipulating the request or response and pass control to other middleware functions in request processing pipeline

```
app.use(express.json());        // parse request body to json
app.get(...);                   // route handler
```

- The above middleware function `express.json()`, parses the request body into a json object but doesn't terminates the request-response cycle
- And then passes control to the next middleware function - route() - a route handler
- With custom middleware functions can be used to do cross-cutting concerns like - logging, authentication, authorization etc.
- An express app is a bunch of middleware functions acting on the request-response cycle

Custom Middleware Functions
---

We can add our custom middleware functions by creating separate modules for them
Ex:
`logger.js`
```
function log(req, res, next) {
    console.log('Logging....');
    next();
}

module.exports = log;
```
- Then use them in our Request Processing Pipeline
```
const express = require('express');
const logger = require('./logger');
const app = express();
app.use(logger);
```

Serving static content
---

- By using `express.static()` built-in middleware, we can serve static content
- It takes as argument, the path of the folder carrying static content

```
app.use(express.static('public'));
```
- By adding above middleware, our static files in `public` folder will be accessible directly
Ex: `http://localhost:3000/readme.txt` will serve a static file `readme.txt` inside public folder

Routing in Express
---

- use app.get(), post(), put() and delete() to provide basic routing
- use app.route() to define chained routing
    Ex:
    ```
    app.route('/book')
        .get((req, res) => { ... })
        .post((req, res) => { ... })
        .put((req, res) => { ... })
        .delete((req, res) => { ... })
    );
    ```
- use `express.Router()` for modular route handlers
    Ex:
    *birds.js*
    ```
    const express = require('express');
    const router = express.Router();
    router.use( // some middlware );
    router.get('/', (req, res) => { ... });
    router.get('/about', (req, res) => { ... });
    modules.export = router;
    ```
    *index.js*
    ```
    const birds = require('./birds');
    app.use('/birds', birds);
    ```

Third Party Middleware
---

- `debug` - for debugging application - adding log statements
- `morgan` - for logging http requests and responses
- `helmet` - for adding http headers
- `bcrypt` - for hashing passwords
etc

Authentication using JWTs
---

- Use `jsonwebtoken` to create a new JWT, and return it on login/register
- Create a middleware `auth` that checks for the validity of a request by extracting the `x-auth-token` in the headers
- ON protected routes, add this new middleware.
- If the token is invalid, return a bad request 400
- If the token is valid, pass control to next middleware - that is the processing callback of the route

*auth.js* middleware
```
const jwt = require('jsonwebtoken');
const config = require('config');   
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided');

    try {
        const decode = jwt.verify(token, config.get('jwtKey'));
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token');
    }
}
```

*customer.js*
```
const auth = require('./middleware/auth');
const express = require('express');
const app = express();
const route = express.Route();
route.get('/', (req, res) => { ... });          // unprotected route
route.post('/', auth, (req, res) => { ... });   // protected route
```

Authentication VS Authorization
---

- Authentication means verifying if the the user is really who he claims to be
- Authorization means verifying if a user has permissions to access a resource
- We do authentication by verifying user credentials stored against it in the database
- We perform authorization by pulling user data out of the jwt and verifying against the roles a particular resource is configured to get access to

Role based auth
---

- Add another middleware that checks for `isAdmin` or any other role
- Add this middleware to a route along with the `auth` middleware

```
function (req, res, next) {
    if (!req.user.isAdmin) return res.send(403).send('Access denied');
    next();
}
.
.
.
route.delete('/', [auth, admin], (req, res) => { ... });
```

