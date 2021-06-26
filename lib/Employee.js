//import database
const db = require ('../db/connection');
const cTable = require ('console.table');
const COLOR = {fgGreen: '\x1b[32m', reset: '\x1b[0m'}; //change the color of the result

class Employee {
    constructor (data) {
        this.data = data;
    }
    //method to get the employee list to display to the user in the inquirer prompts
    async getEmployeeList() {
        const sql = `SELECT CONCAT (first_name, " ", last_name) AS name FROM employees`;
        var empList = [];
        var [list] = await db.promise().query (sql);
        list.forEach(item => {
            empList.push(item.name);
        });
        return empList;
    }

    //method to get the manager list to display to the user in the inquirer prompts
    getManagerList() {
        const sql = `SELECT CONCAT (a.first_name, " ", a.last_name) AS name 
                    FROM employees a 
                    LEFT OUTER JOIN employees b
                    ON b.id = a.manager_id`
        var managerList = [];
        db.query (sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            rows.forEach(item => {
                managerList.push (item.name);
            })
        })

        return managerList;
    }

    //method which will query the entire employees table
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
                    ON b.id = a.manager_id 
                    LEFT JOIN roles
                    ON a.role_id = roles.id
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                    ORDER BY a.id`;
        
        return db.promise().query(sql);
    }

    //method to add a new employee to the employees table
    addEmployee(callInitiateApp) {
        const roleIdQuery = `SELECT id FROM roles WHERE title = ?`;
        const managerIdQuery = `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`
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
            //console.log("roleId", roleId);

            db.query(managerIdQuery, [managerFirstName, managerLastName], (err, row) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }
                //console.log("manager row", row);
                let managerId = row[0].id;
                //console.log("managerId", managerId);
                let params = [this.data.firstName, this.data.lastName, roleId, managerId];

                //console.log("params", params);
                db.query(sql, params, (err, result) => {
                    if (err)
                    {
                        console.log({error : err.message});
                        return;
                    }
                    callInitiateApp();
                 
                    //console.log(`Added ${params[0]} ${params[1]} employee to the database.`);            
                });
            });
        });
    }

    //method that will update the employee role
    updateEmployeeRole(callInitiateApp) {
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
                
                callInitiateApp();
            });


        })
        
    }
    //method to get the employees list for the manager id selected by the user
    getEmpByManagerId(callInitiateApp) {
        let [managerFirstName, managerLastName] = this.data.split(" ");

        db.query('SELECT id FROM employees WHERE first_name = ? AND last_name = ?', [managerFirstName, managerLastName], (err, rows) => {
            if (err)
            {
                console.log({err : err.message});
                return;
            }
            //console.log("rows", rows);
            let empId = rows[0].id;
            //console.log(managerId);
            const sql = 'SELECT * FROM employees WHERE manager_id = ? ';
            //console.log(this.data);
        
            db.query (sql, empId, (err, result) => {
                if (err)
                {
                    console.log({error : err.message});
                    return; 
                }
                //console.log('results', result);
                console.table (result);
                console.log (`${COLOR.fgGreen}========================================================${COLOR.reset}`);
                callInitiateApp();
            })
            

        })
    
    }
    //method that gets the employees list for the department selected by the user
    getEmpByDepartment (callInitiateApp) {
        const sql = `SELECT a.id AS 'Employee Id',
                    a.first_name AS 'First Name',
                    a.last_name AS 'Last Name',
                    departments.name AS Department
                    FROM employees a
                    left JOIN roles
                    ON a.role_id = roles.id
                    left JOIN departments
                    ON roles.department_id = departments.id
                    WHERE departments.id = ?
                    ORDER BY a.id` ;
        //console.log(this.data);

        db.query ('SELECT id FROM departments WHERE name = ?', this.data, (err, row) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            //console.log ('result', row[0].id);
            let deptId = row[0].id;
            db.query (sql, deptId, (err, result) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }
                //console.log(result);
                console.table (result);
                console.log (`${COLOR.fgGreen}========================================================${COLOR.reset}`);
                callInitiateApp();
    
            });
        })
        
    }

    //method to delete the employee selected by the user
    deleteEmployee () {
        const sql = `DELETE FROM employees WHERE first_name = ? AND last_name = ?`;
        let [firstName, lastName] = this.data.split(" ");

        return db.promise().query(sql, [firstName, lastName]);
    }

    //method to uodate the manager of the employee selected by the user
    updateEmpManager (callInitiateApp) {
        const sql = `UPDATE employees SET manager_id = ? WHERE first_name = ? AND last_name = ?`;
        let [managerFirstName, managerLastName] = this.data.managerName.split(" ");
                
        db.query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ?`, [managerFirstName, managerLastName], (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            
            let managerId = rows[0].id;
            //console.log("manager id", managerId);
            let [empFirstName, empLastName] = this.data.empName.split(" ");
            
            db.query(sql, [managerId, empFirstName, empLastName], (err, result) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }    
                
                callInitiateApp();
            });

        })

    }
}

module.exports = Employee;