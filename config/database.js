const {createPool} = require('mysql');
require('dotenv').config();

//MYSQL
const pool = createPool({
    connectionLimit     : process.env.DB_CONNECTION_LIMIT,
    host                : process.env.DB_HOST,
    user                : process.env.DB_USERNAME,
    password            : process.env.DB_PASSWORD,
    database            : process.env.DB_DATABASE,
});

module.exports = pool;