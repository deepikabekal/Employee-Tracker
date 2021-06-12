//import database
const db = require ('../db/connection');
const cTable = require ('console.table');


class Department {
    constructor(data) {
        this.data = data;
    }

    //get the list of all the departments to display in the prompts
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

    //get all the departments for the user to view
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
}

module.exports = Department;