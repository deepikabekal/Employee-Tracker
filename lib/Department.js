//import database
const db = require ('../db/connection');
const cTable = require ('console.table');
const COLOR = {fgGreen: '\x1b[32m', reset: '\x1b[0m'};

//create department class
class Department {
    constructor(data) {
        this.data = data;
    }

    //method to get the department list to display to the user in the inquirer prompts
    getDepartmentList() {
        const sql = `SELECT name FROM departments`;
        var deptList = [];
        db.query(sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }   
                
            rows.forEach(item => {
                deptList.push(item.name);
            })
                        
        });
        return deptList; 

    }

    //method which will query the entire departments table  
    getAllDepartments() {
        const sql = `SELECT id AS 'Department Id', name AS 'Department Name' FROM departments`;
        return db.promise().query(sql);
        
    }

    //method with the query to insert new department to the table
    addDepartment() {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        const params = [this.data];
        //console.log (this.data);
        return db.promise().query(sql, params);
    }

    //method with query to delete a department from the table
    deleteDepartment() {
        const sql = `DELETE FROM departments WHERE name = ?`;
        return db.promise().query(sql, this.data);
    }

    //method with query to get the budget of the department selected by the user
    getBudget(callInitiateApp) {
        const sql = `SELECT SUM(Salary) AS total_salary FROM (SELECT roles.salary AS Salary
                    FROM employees a
                    left JOIN roles
                    ON a.role_id = roles.id
                    left JOIN departments
                    ON roles.department_id = departments.id
                    WHERE departments.name= ?) sub`
        db.query(sql, this.data, (err, row) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            } 
            let totalBudget = row[0].total_salary;
            console.log(`${COLOR.fgGreen}Total budget of the ${this.data} department is ${totalBudget} ${COLOR.reset} `);
            callInitiateApp();
        });
    }
}

module.exports = Department;