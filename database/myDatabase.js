require('dotenv').config()
const mysql = require("mysql2");

let con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWORD,
    database: process.env.DATABASE_DB
});

module.exports = {con};