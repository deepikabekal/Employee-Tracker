//import database
const db = require ('../db/connection');
const cTable = require ('console.table');

class Department {
    constructor(data) {
        this.data = data;
    }

    getAllDepartments() {
        const sql = `SELECT id AS 'Department Id', name AS 'Department Name' FROM departments`;
        db.query(sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            console.table(rows);
        });

    }

    addDepartment() {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        const params = [this.data[0].name];
        //console.log (this.data);
        db.query(sql, params, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            console.log(`Added ${params} department to the database.`);
        });
    }
}

module.exports = Department;