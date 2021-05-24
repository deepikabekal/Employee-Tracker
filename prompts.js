const inquirer = require ('inquirer');
const db = require ('./db/connection');
const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');


var questions = () => {
    inquirer.prompt([
        {
            type : "list", 
            name : "options", 
            message : "What would you like to do?", 
            choices : ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "none"]
        }
    ])
    .then(response => {
        console.log(response);
        renderOutput(response.options);
    })
};



function renderOutput(option) {
    switch (option) {
        case "View all departments" :
            const department = new Department ();
            department.getAllDepartments();
            break;
        
        case "View all roles" :
            const role = new Role();
            role.getAllRoles();
            break;
        
        case "View all employees" :
            const employee = new Employee();
            employee.getAllEmployees();
            break;

        case "Add a department" :
            userInputDept();
            break;

        case "Add a role" :
            userInputRole();
            break;

        case "Add an employee" :
            userInputEmp();
            break;

        case "Update an employee role" :
            userUpdateEmp();
            break;
    }

}

function userInputDept () {
    inquirer.prompt([
        {
            type : 'input',
            name : 'name',
            message : 'What is the name of the department?',
            validate : nameInput => {
                if (nameInput)
                {
                    return true;
                }
                else
                {
                    console.log("Invalid Entry! Please try again.");
                    return false;
                }
            }
        }
        
    ])
    .then((response) => {
        console.log(response);
        const department = new Department(response.name);
        department.addDepartment();
        questions();
    })
}



questions();

