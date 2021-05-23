//import database
const db = require ('./db/connection');
const cTable = require ('console.table');

class Employee {
    constructor (data) {
        this.data = data;
    }

    getAllEmployees() {
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            console.table(rows);
        });  
    }

    addEmployee() {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [this.data[0].first_name, this.data[0].last_name, this.data[0].role_id, this.data[0].manager_id];
        db.query(sql, params, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            console.log(`Added ${params[0]} ${params[1]} employee to the database.`);            
        });
    }

    updateEmployeeRole() {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [this.data.role_id, this.data.id];
        db.query(sql, params, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            console.log(`Employee role updated.`);            
        });
    }

}

module.exports = Employee;