//import database
const db = require ('../db/connection');
const cTable = require ('console.table');

class Employee {
    constructor (data) {
        this.data = data;
    }

    getEmployeeList() {
        const sql = `SELECT CONCAT (first_name, " ", last_name) AS name FROM employees`;
        var empList = [];
        db.query (sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            rows.forEach(item => {
                empList.push(item.name);
            });

            //console.log ("inside funtion", empList);
            
        });

        return empList;
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
        const roleIdQuery = `SELECT id FROM roles WHERE title = ?`;
        const managerIdQuery = `SELECT manager_id FROM employees WHERE first_name = ? AND last_name = ?`
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        let managerName = this.data.managerName;
        let [managerFirstName, managerLastName] = managerName.split(" ");
        
        db.query(roleIdQuery,this.data.roleName, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            let roleId = result[0].id;
            console.log("roleId", roleId);

            db.query(managerIdQuery, [managerFirstName, managerLastName], (err, row) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }
                console.log("manager row", row);
                let managerId = row[0].manager_id;
                console.log("managerId", managerId);
                let params = [this.data.firstName, this.data.lastName, roleId, managerId];
                console.log("params", params);
                db.query(sql, params, (err, result) => {
                    if (err)
                    {
                        console.log({error : err.message});
                        return;
                    }
                    console.log(`Added ${params[0]} ${params[1]} employee to the database.`);            
                });
            });
        });
    }

    updateEmployeeRole() {
        const sql = `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`;
        
        db.query(`SELECT id FROM roles WHERE title = ?`, this.data.roleName, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            
            let roleId = rows[0].id;
            let [employeeFirstName, employeeLastName] = this.data.employeeName.split(" ");
            
            db.query(sql, [roleId, employeeFirstName, employeeLastName], (err, result) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }
                console.log(`${this.data.employeeName}'s role has been updated.`);            
            });


        })
        
    }

}

module.exports = Employee;