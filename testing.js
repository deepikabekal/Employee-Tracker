const db = require ('./db/connection');

const name = 'James Fraser'
function getEmpByManagerId() {
    const sql = 'SELECT * FROM employees WHERE manager_id = ? ';
    //console.log(this.data);
    let [managerFirstName, managerLastName] = name.split(" ");

    db.query('SELECT manager_id FROM employees WHERE first_name = ? AND last_name = ?', [managerFirstName, managerLastName], (err, rows) => {
        if (err)
        {
            console.log({err : err.message});
            return;
        }

        let managerId = rows[0].managerId;
        console.log(managerId);
        db.query (sql, managerId, (err, result) => {
            if (err)
            {
                console.log({error : err.message});
                return; 
            }
            console.table(result)
        })
        

    })
}
getEmpByManagerId(name);