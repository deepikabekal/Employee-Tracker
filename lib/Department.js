//import database
const db = require ('../db/connection');
const cTable = require ('console.table');
const COLOR = {fgGreen: '\x1b[32m', reset: '\x1b[0m'};


class Department {
    constructor(data) {
        this.data = data;
    }

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


    getAllDepartments() {
        const sql = `SELECT id AS 'Department Id', name AS 'Department Name' FROM departments`;
        return db.promise().query(sql);
        
    }

    
    addDepartment() {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        const params = [this.data];
        //console.log (this.data);
        return db.promise().query(sql, params);
    }

    deleteDepartment() {
        const sql = `DELETE FROM departments WHERE name = ?`;
        return db.promise().query(sql, this.data);
    }

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