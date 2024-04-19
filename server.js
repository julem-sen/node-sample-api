const http = require('http');
const app = require('./app');
require('dotenv').config();
// const routes = require('./config/routes');

const port = process.env.APP_PORT || 5000;

const server = http.createServer(app);

server.listen(port);

