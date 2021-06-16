const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');
const employee = new Employee();
const role = new Role();
const department = new Department();
var empList = employee.getEmployeeList();
var roleList = role.getRoleList();
var deptList = department.getDepartmentList();


var initialQuestions = [
    {
        type : "list", 
        name : "options", 
        message : "What would you like to do?", 
        choices : ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "none"]
    }
];

var departmentQuestions = [
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
    
];

var roleQuestions = [
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
];

var addEmpQuestions = [
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
];

var updateEmpQuestions = [
    {
        type : 'confirm',
        name : "confirmation",
        message : "Do you want to update an employee information?"
        
    },
    {
        type : 'list',
        name : 'employeeName',
        message : "Which employee information do you want to update?",
        choices : empList,
        when : ({confirmation}) => {
            if(confirmation)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },
    {
        type : 'list',
        name : 'roleName',
        message  :'Choose a role',
        choices : roleList,
        when : ({confirmation}) => {
            if(confirmation)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
];

module.exports = {initialQuestions, departmentQuestions, addEmpQuestions, updateEmpQuestions,  roleQuestions};