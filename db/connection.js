const inquirer = require('inquirer');
const db = require ('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'pass',
      database: 'employees'
    },
    console.log('Connected to the election database.')
);