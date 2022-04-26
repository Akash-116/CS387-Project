const Pool = require("pg").Pool;

require('dotenv').config()


// Using as env variables is a very good habit, to protect sensitive 
// information from pushing to github
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

module.exports = pool;
