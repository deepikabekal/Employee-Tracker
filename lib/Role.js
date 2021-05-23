//import database
const db = require ('./db/connection');
const cTable = require ('console.table');

class Role {
    constructor (data) {
        this.data = data;
    }

    getAllRoles() {
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }

            console.table(rows);
        });
    }

    addRole() {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [this.data[0].title, this.data[0].salary, this.data[0].department_id];
        console.log(this.data);
        db.query(sql, params, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            console.log(`Added ${params[0]} role to the database.`);            
        });
    }
}

module.exports = Role;