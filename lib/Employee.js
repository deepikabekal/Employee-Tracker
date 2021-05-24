//import database
const db = require ('../db/connection');
const cTable = require ('console.table');

class Employee {
    constructor (data) {
        this.data = data;
    }

    getAllEmployees() {
        const sql = `SELECT 
                    a.id AS 'Employee Id',
                    a.first_name AS 'First Name',
                    a.last_name AS 'Last Name',
                    roles.title AS 'Job Title', 
                    departments.name AS Department, 
                    roles.salary AS Salary,
                    CONCAT (b.first_name, ' ' , b.last_name) AS Manager
                    FROM employees a
                    LEFT OUTER JOIN employees b 
                    ON a.id = b.manager_id 
                    LEFT JOIN roles
                    ON a.role_id = roles.id
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    ORDER BY a.id`;
        
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
        const params = [this.data[0].role_id, this.data[0].id];
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