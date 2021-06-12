const inquirer = require ('inquirer');
const db = require ('./db/connection');
const prompts = require('./prompts');
const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');
const { promise } = require('./db/connection');




function initiateApp () {
    console.log("I am inside the initiateApp");
    inquirer.prompt(prompts.initialQuestions)
    .then(response => {
        renderOutput(response.options);                        
    });      
};



async function renderOutput(option) {
    switch (option) {
        case "View all departments" :
            const department = new Department();
            console.log ("=================  All Departments ===========");
            let [rows,fields]  =  await department.getAllDepartments();
            console.table(rows)
            initiateApp();            
            break;
        
        case "View all roles" :
            const role = new Role();
            console.log ("=================  All Roles ===========");
            role.getAllRoles();
            initiateApp();
            break;
        
        case "View all employees" :
            const employee = new Employee();
            employee.getAllEmployees();
            initiateApp();
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

async function userInputDept () {
    await inquirer.prompt(prompts.departmentQuestions)
    .then((response) => {
        //console.log(response);
        const department = new Department(response.name);
        department.addDepartment();
    }).then(data => {
        initiateApp();
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
    renderOutput(options);
    console.log("hello");
    await initiateApp();
    
}




initiateApp();