const inquirer = require ('inquirer');
const db = require ('./db/connection');
const prompts = require('./prompts');
const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');


function initiateApp () {
    inquirer.prompt(prompts.initialQuestions)
    .then(response => {
        renderOutput(response.options);                        
    });      
};



function renderOutput(option) {
    switch (option) {
        case "View all departments" :
            const department = new Department();
            department.getAllDepartments();
            //questions();
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

        case "none" :
            console.log("Bye!");
            process.exit();
            
    }

    return;

}

function userInputDept () {
    inquirer.prompt(prompts.departmentQuestions)
    .then((response) => {
        //console.log(response);
        const department = new Department(response.name);
        department.addDepartment();
        questions();
    })
}

function userInputRole () {
    const department = new Department();
    var deptList = department.getDepartmentList();
    //console.log("deptList", deptList);
    inquirer.prompt(
        )
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
    console.log("emplist", empList);
    var roleList = role.getRoleList();
    inquirer.prompt(
        
        )
    .then(response => {
        console.log("response", response);
        const employee = new Employee(response);
        employee.addEmployee();
        questions();
    })
}

function userUpdateEmp () {
    const employeeOne = new Employee();
    const roleOne = new Role();
    var empListONe = employeeOne.getEmployeeList();
    console.log("emplist", empListONe);
    var roleListONe = roleOne.getRoleList();
    inquirer.prompt(
        
        
        )
    .then(response => {
        //console.log(response);
        if (!response.confirmation)
        {
            questions();
        }
        else
        {
            //console.log("here");
            const employee = new Employee(response);
            employee.updateEmployeeRole();
            questions();
        }
        
    })

    
}

async function repeatQuestions(options) {
    await initiateApp();
    renderOutput(options);
    console.log("hello");
}




initiateApp();