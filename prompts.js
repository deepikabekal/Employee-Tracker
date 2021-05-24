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

function userInputRole () {
    const department = new Department();
    var deptList = department.getDepartmentList();
    //console.log("deptList", deptList);
    inquirer.prompt([
        {
            type : 'input', 
            name : 'title',
            message : 'What is the title of the role?',
            validate : titleInput => {
                if (titleInput)
                {
                    return true;
                }
                else
                {
                    console.log("Invalid Entry! Please try again");
                    return false;
                }
            }
        },
        {
            type : 'input',
            name : 'salary',
            message : 'What is the salary for the role?',
            validate : salaryInput => {
                if (isNaN(salaryInput))
                {
                    console.log("Invalid Entry! Salary has to be a number!");
                    return false;
                }
                return true;
            }
        },
        {
            type : 'list',
            name : 'departmentName',
            message : 'Choose a department to which the role belongs.',
            choices : deptList
        }
    ])
    .then (response => {
        console.log(response);
        const role = new Role(response);
        role.addRole();
        questions();
    })
}


function userInputEmp() {
    const employee = new Employee();
    const role = new Role();
    var empList = employee.getEmployeeList();
    var roleList = role.getRoleList();
    inquirer.prompt([
        {
            type : 'input',
            name : 'firstName', 
            message : 'What is the first name of the employee?',
            validate : firstName => {
                if (firstName)
                {
                    return true;
                }
                else
                {
                    console.log("Incorrect Entry! Please try again");
                    return false;
                }
            }
        },
        {
            type : 'input',
            name : 'lastName', 
            message : 'What is the last name of the employee?',
            validate : lastName => {
                if (lastName)
                {
                    return true;
                }
                else
                {
                    console.log("Incorrect Entry! Please try again");
                    return false;
                }
            } 
        },
        {
            type : 'list',
            name : 'roleName', 
            message : 'What is the role of the employee?',
            choices : roleList
        },
        {
            type : 'list',
            name : 'managerName', 
            message : 'What is the name of the Manager?',
            choices : empList
        }
    ])
    .then(response => {
        console.log("response", response);
    })
}




questions();

