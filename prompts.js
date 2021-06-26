// const Department = require ('./lib/Department');
// const Employee = require ('./lib/Employee');
// const Role = require ('./lib/Role');
// const employee = new Employee();
// const role = new Role();
// const department = new Department();
// var empList = employee.getEmployeeList();
// var roleList = role.getRoleList();
// var deptList = department.getDepartmentList();
// var managerList = employee.getManagerList();


var initialQuestions = [
    {
        type : "list", 
        name : "options", 
        message : "What would you like to do?", 
        choices : ["View all departments", "View all roles", "View all employees", "View employees by manager", "View employees by department", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Update employee manager", "Delete a department", "Delete a role", "Delete an employee", "View the total budget of a department", "none"]
    }
];

var addDepartmentQuestions = 
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
    };

var addRoleQuestions = [
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
        message : 'Choose a department to which the role belongs.'
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

var getEmpByManagerQuestions = 
    {
        type : 'list',
        name : 'managerName',
        message : "Which manager's employees do you want to view?",
        choices : managerList
    };

var getEmpByDeptQuesions = 
    {
        type : 'list',
        name : 'deptName',
        message : "Which department's employees do you want to view?"
    };

var updateEmpManagerQuestions = [
    {
        type : 'list',
        name : 'empName',
        message : "Which employee's manager do you want to update?",
        choices : empList
    },
    {
        type : 'list',
        name : 'managerName',
        message : 'Which employee do you want to set as manager for the selected employee?',
        choices : empList
    }
];

var deleteDeptQuestions = 
    {
        type : 'list',
        name : 'deptName',
        message : "Which department do you want to delete?"        
    };

var deleteRoleQuestions = 
    {
        type : 'list',
        name : 'roleName',
        message : "Which role do you want to delete?"
    };

var deleteEmpQuestions = 
    {
        type : 'list',
        name : 'empName',
        message : "Which employee do you want to delete?"
    };

var budgetQuestions = 
    {
        type : 'list',
        name : 'deptName',
        message : "Choose the department to view the total utilized budget.",
    };

module.exports = {
    initialQuestions, addDepartmentQuestions, addEmpQuestions, 
    updateEmpQuestions,  addRoleQuestions, updateEmpManagerQuestions,
    deleteDeptQuestions, deleteRoleQuestions, deleteEmpQuestions,
    budgetQuestions, getEmpByDeptQuesions, getEmpByManagerQuestions
};