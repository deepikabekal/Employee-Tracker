//question of the respective prompts

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
        message : 'What is the role of the employee?'
    },
    {
        type : 'list',
        name : 'managerName', 
        message : 'What is the name of the Manager?'
    }
];

var updateEmpRoleQuestions = [
    {
        type : 'list',
        name : 'employeeName',
        message : "Which employee information do you want to update?",
        
    },
    {
        type : 'list',
        name : 'roleName',
        message  :'Choose a role',
        
    }
];

var getEmpByManagerQuestions = 
    {
        type : 'list',
        name : 'managerName',
        message : "Which manager's employees do you want to view?"
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
        message : "Which employee's manager do you want to update?"
    },
    {
        type : 'list',
        name : 'managerName',
        message : 'Which employee do you want to set as manager for the selected employee?'
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
    updateEmpRoleQuestions,  addRoleQuestions, updateEmpManagerQuestions,
    deleteDeptQuestions, deleteRoleQuestions, deleteEmpQuestions,
    budgetQuestions, getEmpByDeptQuesions, getEmpByManagerQuestions
};