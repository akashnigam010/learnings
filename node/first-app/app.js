const Logger = require('./logger');
const logger = new Logger();
const http = require('http');

logger.on('messageLogged', (args) => {
    console.log('Event Listened: ', args);
})

// logger.log('Akash');

const server = http.createServer((req, res) => {
    res.write('Hello World');
    res.end();
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});