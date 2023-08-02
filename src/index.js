require('dotenv').config();

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, async () => {
    console.log('Server is listening on port 4000');
});
