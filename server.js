const inquirer = require ('inquirer');
const db = require ('./db/connection');
const prompts = require('./prompts');
const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');
//const { promise } = require('./db/connection');




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
            let [deptRows,deptFields]  =  await department.getAllDepartments();
            console.table(deptRows)
            initiateApp();            
            break;
        
        case "View all roles" :
            const role = new Role();
            console.log ("=================  All Roles ===========");
            let [roleRows, roleFields] = await role.getAllRoles();
            console.table(roleRows);
            initiateApp();
            break;
        
        case "View all employees" :
            const employee = new Employee();
            console.log("================== All Employees ==============")
            let [empRows, empFields] = await employee.getAllEmployees();
            console.table(empRows);
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

function userInputDept () {
    inquirer.prompt(prompts.departmentQuestions)
    .then((response) => {
        //console.log(response);
        const department = new Department(response.name);
        department.addDepartment();
        console.log(`Added ${response.name} department to the database.`);
        initiateApp();
    })
}

function userInputRole () {
    const department = new Department();
    var deptList = department.getDepartmentList();
    //console.log("deptList", deptList);
    inquirer.prompt(prompts.roleQuestions)
    .then(response => {
        //console.log(response);
        const role = new Role(response);
        role.addRole();
        console.log(`Added role to the database.`); 
        initiateApp();
    })
}


function userInputEmp() {
    const employee = new Employee();
    const role = new Role();
    var empList = employee.getEmployeeList();
    //console.log("emplist", empList);
    var roleList = role.getRoleList();
    inquirer.prompt(prompts.addEmpQuestions)
    .then(response => {
        //console.log("response", response);
        const employee = new Employee(response);
        employee.addEmployee();
        console.log(`Employee ${response.firstName} ${response.lastName} is added to the database.`);
        initiateApp();
    })
}

function userUpdateEmp () {
    const employeeOne = new Employee();
    const roleOne = new Role();
    var empListONe = employeeOne.getEmployeeList();
    console.log("emplist", empListONe);
    var roleListONe = roleOne.getRoleList();
    inquirer.prompt(prompts.updateEmpQuestions)
    .then(response => {
        //console.log(response);
        if (!response.confirmation)
        {
            initiateApp();
        }
        else
        {
            //console.log("here");
            const employee = new Employee(response);
            employee.updateEmployeeRole();
            console.log(`${response.employeeName}'s role has been updated.`);   
            initiateApp();
        }
        
    })

    
}

initiateApp();