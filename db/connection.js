const mysql = require ('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'pass',
      database: 'employees_tracker'
    },
    console.log('Connected to the Employees_Tracker database.')
);

module.exports = db;