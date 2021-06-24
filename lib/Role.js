//import database
const db = require ('../db/connection');
const cTable = require ('console.table');
const COLOR = {fgGreen: '\x1b[32m', reset: '\x1b[0m'}; //change the color of the result


class Role {
    constructor (data) {
        this.data = data;
    }
    //method to get the role list to display to the user in the inquirer prompts
    getRoleList() {
        const sql = `SELECT title FROM roles`;
        var roleList = [];

        db.query(sql, (err, rows) => {
            if (err)
            {
                console.log({error : err.message});
                return;
            }
            //console.log("rows", rows);
            rows.forEach(item => {
                roleList.push(item.title);
            });

            //console.log("role", roleList);

        });
        
        return roleList;
    }

    //method which will query the entire roles table
    getAllRoles() {
        const sql = `SELECT 
                    roles.id AS 'Role Id', 
                    roles.title as 'Job Title', 
                    departments.name AS Departments, 
                    roles.salary AS Salary
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`;
                    
        return db.promise().query(sql);
    }

    //method to add new role 
    addRole(callInitiateApp) {
         //get the department id using department name
         const subQuery = `SELECT id FROM departments WHERE name = ?`;
         db.query(subQuery, this.data.departmentName, (err, row) => {
             if (err)
             {
                 console.log({error : err.message});
                 return;
             }

             //insert the new role
            const params = [this.data.title, this.data.salary, row[0].id];
            //console.log("param", params);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            
            db.query(sql, params, (err, result) => {
                if (err)
                {
                    console.log({error : err.message});
                    return;
                }    
                
                console.log(`${COLOR.fgGreen}Added ${params[0]} role to the database.${COLOR.reset}`); 
                callInitiateApp();
            });
                
        })

    }
    //method to delete a role
    deleteRole() {
        const sql = `DELETE FROM roles WHERE title = ?`;
        return db.promise().query(sql, this.data);
    }

}

module.exports = Role;