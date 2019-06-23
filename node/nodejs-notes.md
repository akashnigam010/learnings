Node JS
===

- Node is a runtime environment for executing javascript code, outside the browser. It makes use of Google's v8 engine - the same engine Google uses to run javascript code in Chrome browser
- Node can be used to create highly-scalable, data-intensive, real-time apps
- Node is not a language and thus can't be compared with Java, Ruby etc - it is only an engine where javascript can run. Therefore a better comparison would be to compare Java or Ruby with Javascript 
- Objects like `document` and `window` are not available as they are provided by browser environment, instead objects like `fs` and `http` are available which are provided by Node environment.

Synchronous vs Asynchronous
---

- Node works in asynchronous or non-blocking fashion by default (as opposed to Java, which works by syncronous or blocking fashion by default)
- A single thread serves multiple requests by making use of Event Queue and thus utilzing a single thread to its maximum capacity
- Node keeps monitoring the Event Queue and processes it as soon as data is available at it.
- Node shouldn't be used to create CPU-instensive apps because it is single threaded and large comptations might make it slow and thus other clients need to wait until a thread is available. It must be used to create data-intensive apps  - where there are a lot of data being transferred - from db to UI

First app - Hello World
---
- Create a file - app.js
```
hello = name => console.log('Hello ' + name);

hello('Akash');
```
- Run it with `node app.js`
- Simple!

Node Module System
---

Few modules that are built into Node Core - `OS, File System, Events and Http`

Global Objects and Functions
---

1. `console` - global object
2. `setTimeout` - global function
3. `clearTimeout` - clear timeout
4. `setInterval` - repeatedly calling a function after a given delay
5. `clearInterval` - clear interval

- In a browser, `window` is the global object and all the variables and functions which are not part of any object are part of `window` object
Ex:
```
window.console.log('hello');    // console is a property of window
var msg = 'asd';                // msg is now property of window
```

- Similarly in Node, instead of window, we have `global` object
- HOWEVER variables and functions are not part of this global object, instead these are scoped only to the file in which they are defined - because of Node's modular structure
- This is made in such a way to avoid propblem of global scope - 2 files having same named methods - thus one overriding another
- Modules are used to keep them separate and avoid such problems
- Every file in a node app is considered a module
- Variables and functions are scoped to that file
- In OOP terms, they are private to that module/file
- Need to use outside, export it and make it public

```
console.log(module);
```
- The above will log the module object which is created per file in a node app
- All the functions and variables defined in this file are scoped to its module object

Exporting a module
---

- Each file in Node is a module and while logging a module object we find `exports: {...}` as one of the property of the module object
- We can add variables and functions to this export object to export them too the outside world - making them public.
Ex:
*logger.js*
```
const url = 'http://asdasd.com';
logMessage = message => console.log(message);
module.exports.log = logMessage;
```
*app.js*
```
const logger = require('./logger');
logger.log('Hello World');
```

- `require()` is used to load a module - provided by Node Core

- Now instead of exporting the whole exports object, we can simply export the only log function and use it in app.js as a functional import - like below
*logger.js*
```
const url = 'http://www.hellow.io';
log = message => console.log(message);
module.exports = log;   
```
*app.js*
```
const log = require('./logger');
log('Hello World');
```


How are require and module available to use in a file?
---

- Node converts the code that we write in a js file into an IIFE.
- It wraps the whole thing inside a function with following signature
```
(function(exports, require, module, __filename, __dirname) {
    ...     // our code goes here
})
```

- `exports, require, module, __filename and __dirname` are passed to every module, and therefore these are available to use - BUT THEY ARE NOT GLOBAL FUNCTIONS OR VARIABLES

Path Module
---

To get Module path information
```
const path = require('path');
console.log(path);
```

OS Module
---

To get information about OS
```
const os = require('os');
console.log(os.freemem());
```

File System Module
---

Handling file i/o
```
const fs = require('fs');

fs.readdir('./', (err, files) => {
    if(err) console.log(err);
    else console.log(...files);
});
```

Logger as EventEmitter class
---

```
const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, message: message });
    }
}

module.exports = Logger;   
```

*app.js*
```
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (args) => {
    console.log('Event Listened: ', args);
})

logger.log('Akash');
```

HTTP module
---

- For creating server and listening to new connections, requests
- Create a server and listen to requests

```
const http = require('http');
const server = http.createServer((req, res) => {
    res.write('Hello World');
    res.end();
});
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```
- `createServer()` is a method that returns a server object which is an event emitter
- So methods like `on()`, `addListener()` are available to use

NPM
---

*Resolving a module*
```
const _ = require('underscore');

// Core module
// File or folder
// node_modules
```

- `require` function first checks this module in the Node Core. If it is not found there,
- it checks this in the current directory assuming there is a folder named `underscore` and inside that, there is an `index.js` or `underscore.js`. If not found, 
- it does the same folder check inside `node_nodules` folder
- if the module is not found anywhere, it throws an error

package-lock.json
---

Node uses this file to manage the dependancies internally. Shouldn't bother us.

Semantic Versioning
---

Versioning : Major.Minor.Patch ex. 4.16.5

- Bug fixes - patch version update
- New features that doesn't break the api - Minor version update
- New features or bug fixes that might break the existing api - Major version update

Using `Caret` or `Tilde` symbol with version. Ex `^4.16.4` or `~4.16.4`

Meaning, while npm install, npm installs the latest version which has `4` as the major version. Ex. `4.18.2`
So either use caret or tilde or `x`
Ex:
```
"dependencies" : {
    "underscore": "^4.16.4"
}

// or

"dependencies" : {
    "underscore": "~4.16.4"
}

// or

"dependencies" : {
    "underscore": "4.x"
}
```

- to force npm to get the exact version - do not use tilde, caret or x

npm list
---

Lists all dependencies
`npm list`
 - without depth: `npm list --depth=0`

See package.json of a dependancy
---

`npm view underscore`

Dev Dependencies
---

Ex. dependencies for code bundling, minifying, running unit tests etc
These must not be shipped with the final product, thus defined in `devDependencies` inside package.json

```
npm install jshint --save-dev
```

Uninstall
---

`npm uninstall underscore`

Cluster Module
---

- Node is by default single threaded, meaning it runs in a single runs even on a multicore processor
- We can configure it though to run with multiple threads using Cluster Module
- Using cluster will have more than one threads (node worker processes) running in parallel per core, all load balanced internally by cluster module.
- Each worker process will have its own event loop and memory space

Event Loop In Node vs Event Loop in Browsers
---

- Event loop is used in both browsers and Node for doing non-blocking asynchronous operations.
- Both use Google's V8 engine to run javascript
- Browser provides WebAPIs, Event Queue and Event Loop
- Node provides Kernel APIs, Event Queue and Event Loop using libuv library written in C

*Even Loop working*

- When the main thread encounters a blocking operation (with a callback function), instead of pushing it on the main call stack, it is pushed to the WebAPI stack in browsers and Kernel stack in Node where these operations occur and the main process continues to run other instructions
- When the blocking operation happens (timeOut occurred, http call returned, click occurred), the callback function associated with these operation is pushed to the event queue
- Now if the main call stack is still executing, it will continue until it is empty and then Event Loop will see if a callback is present at the event queue to be processed yet.
- If yes, that callback function will be pushed to the call stack and executed.

**Important**
- In Node, the synchronous operation is provided to kernal API, which will run it using system's API, which could be multithreaded (using C - libuv)
- Whereas in browser, the WebAPI handles the sync operation and not the system kernel
- There is not a single stack to keep all the synchronous operations but it is divided in many phases like - timeout, ajax, i/o etc.

Callback Functions
---

```
console.log('Before');
getUser((user) => {
    console.log(user);
});
console.log('After');
function getUser(fn) {
    setTimeout(() => {
        fn({ id: 1, name: 'Akash' });
    }, 2000);
}
```

Callback Hell
---

```
getUser(1, (user) => {
    getRepositories(user.id, (repos) => {
        getCommits(repos[0].id, (commits) => {
            displayCommits(commits) {
                console.log(commits);
            }
        });
    });
});
```

- Such code keeps getting nested and causing a callback hell.

Named Functions
---

- To resove a callback hell, we can use Named Functions
- We do not call the functions, instead just pass them as a param

```
getUser(1);

function getUser(id) {
    return getUser(id, getRepositories)
}

function getRepositories(user) {
    return getRepositories(id, getCommits);
}

function getCommits(repos) {
    return getCommits(repose, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}
```

Promise
---

- A promise is an object that holds the eventual result of an asynchronous operation
- It will hold either a value or an error
- A promise has 3 states :
    - PENDING
    - RESOLVED
    - REJECTED

```
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('error occurred'));
    }, 2000);
});

p.then(response => console.log('Resolved', response))
    .catch(err => console.log('Rejected', err.message));

console.log('Hello World');
```

- `then and catch` are non blocking
- Either a promise gets resolved or rejected

Callback hell solved with Promises
---

```
getUser(1)
    .then(user => getRepositories(user))
    .then(repos => getCommits(repos))
    .then(commits => console.log(commits))
    .catch(err => console.log(err.message));
```

- If any promise returns error, the single error handler will handle it

Async/Await
---

- Async await is a syntactical sugar around promises and make the code look synchronous and thus easy to read

```
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos);
        console.log(commits);
        console.log('Hi');
    } catch (err) {
        console.log(err.message)
    }
}
displayCommits();
```

- JS requires to wrap the await statements in an async function, which needs to be called later
- Whole method becomes synchronous. last statement of console.log('Hi') also waits for the code above to execute first

