const mysql = require ('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: process.env.MYSQL_PASS,
      database: 'employees_tracker'
    },
    console.log('Connected to the Employees_Tracker database.')
);

module.exports = db;