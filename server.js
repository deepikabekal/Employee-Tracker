const inquirer = require ('inquirer');
const db = require ('./db/connection');
const prompts = require('./prompts');
const Department = require ('./lib/Department');
const Employee = require ('./lib/Employee');
const Role = require ('./lib/Role');
const { promise } = require('./db/connection');
const COLOR = {fgGreen: '\x1b[32m', reset: '\x1b[0m'}; //change the color of the result





function initiateApp () {
    //console.log("I am inside the initiateApp");
    inquirer.prompt(prompts.initialQuestions)
    .then(response => {
        renderOutput(response.options);                        
    });      
};



function renderOutput(option) {
    switch (option) {
        case "View all departments" :
            viewAllDept();            
            break;
        
        case "View all roles" :
            viewAllRoles();
            break;
        
        case "View all employees" :
            viewAllEmployees();
            break;

        case "View employees by manager" :
            getEmployeeByManager();
            break;
            
        case "View employees by department" : 
            getEmployeesByDepartment();
            break;

        case "Add a department" :
            callAddDepartment();
            break;

        case "Add a role" :
            callAddRole();
            break;

        case "Add an employee" :
            callAddEmployee();
            break;

        case "Update an employee role" :
            callUpdateEmployeeRole();
            break;

        case "Update employee manager" : 
            callUpdateEmployeeManager();
            break;

        case "Delete a department" : 
            callDeleteDept();
            break;

        case "Delete a role" : 
            callDeleteRole();
            break;
        
        case "Delete an employee" : 
            callDeleteEmp();
            break;

        case "View the total budget of a department" :
            callBudget();
            break;

        case "none" :
            console.log("Bye!");
            process.exit();
            
    }

    return;

}

async function viewAllDept() {
    const department = new Department();
    console.log (`${COLOR.fgGreen}=================  All Departments ===========${COLOR.reset}`);
    let [deptRows,deptFields]  =  await department.getAllDepartments();
    console.table(deptRows)
    console.log (`${COLOR.fgGreen}==============================================${COLOR.reset}`);
    initiateApp();
}

async function viewAllRoles() {
    const role = new Role();
    console.log (`${COLOR.fgGreen}=================  All Roles ================${COLOR.reset}`);
    let [roleRows, roleFields] = await role.getAllRoles();
    console.table(roleRows);
    console.log (`${COLOR.fgGreen}=============================================${COLOR.reset}`);
    initiateApp();

}

async function viewAllEmployees() {
    const employee = new Employee();
    console.log (`${COLOR.fgGreen}=================  All Employees ===========${COLOR.reset}`);
    let [empRows, empFields] = await employee.getAllEmployees();
    console.table(empRows);
    console.log (`${COLOR.fgGreen}============================================${COLOR.reset}`);
    initiateApp();
}

async function getEmployeesByDepartment () {
    const department = new Department();
    const deptList = await department.getDepartmentList();
    prompts.getEmpByDeptQuesions.choices = deptList;

    inquirer.prompt(prompts.getEmpByDeptQuesions)
    .then (response => {
        //console.log('response', response);
        const employee = new Employee (response.deptName);
        console.log(`${COLOR.fgGreen}================== All Employees of ${response.deptName} ==============${COLOR.reset}`);
        employee.getEmpByDepartment(initiateApp);
    })
    .catch (err => {
        console.log("error is here", err);
    })
}

async function getEmployeeByManager () {
    const employee = new Employee();
    const managerList = await employee.getManagerList();
    prompts.getEmpByManagerQuestions.choices = managerList;

    inquirer.prompt(prompts.getEmpByManagerQuestions)
    .then (response => {
        const employee = new Employee (response.managerName);
        //console.log("employee", employee1);
        console.log(`${COLOR.fgGreen}================== All Employees of ${response.managerName} ==============${COLOR.reset}`);
        employee.getEmpByManagerId(initiateApp);
        //console.table(empRows);
    }).catch (err => {
        console.log("error is here", err);
    })
}

function callAddDepartment () {
    inquirer.prompt(prompts.addDepartmentQuestions)
    .then((response) => {
        //console.log(response);
        const department = new Department(response.name);
        department.addDepartment();
        console.log(`${COLOR.fgGreen}Added ${response.name} department to the database.${COLOR.reset}`);
        initiateApp();
    })
}

async function callAddRole () {
    const department = new Department();
    const deptList = await department.getDepartmentList();
    prompts.addRoleQuestions[2].choices = deptList;

    inquirer.prompt(prompts.addRoleQuestions)
    .then(response => {
        //console.log(response);
        const role = new Role(response);
        role.addRole(initiateApp);
        //initiateApp();
    })
}


async function callAddEmployee() {
    const employee = new Employee();
    const empList =await employee.getEmployeeList();
    prompts.addEmpQuestions[3].choices = empList;

    const role = new Role();
    const roleList = await role.getRoleList();
    prompts.addEmpQuestions[2].choices = roleList;

    inquirer.prompt(prompts.addEmpQuestions)
    .then(async response => {
        //console.log("response", response);
        const employee = new Employee(response);
        employee.addEmployee(initiateApp);
        console.log(`${COLOR.fgGreen}Employee ${response.firstName} ${response.lastName} is added to the database.${COLOR.reset}`);
        //initiateApp();
    })
}

async function callUpdateEmployeeRole () {
    const employee = new Employee();
    const empList = await employee.getEmployeeList();
    prompts.updateEmpRoleQuestions[0].choices = empList;

    const role = new Role();
    const roleList = await role.getRoleList();
    prompts.updateEmpRoleQuestions[1].choices = roleList;
    
    inquirer.prompt(prompts.updateEmpRoleQuestions)
    .then(response => {
        console.log(response);
            const employee = new Employee(response);
            employee.updateEmployeeRole(initiateApp);
            console.log(`${COLOR.fgGreen}${response.employeeName}'s role has been updated.${COLOR.reset}`);          
    })

    
}

async function callUpdateEmployeeManager() {
    const employee = new Employee();
    const managerList = await employee.getManagerList();
    prompts.updateEmpManagerQuestions[1].choices = managerList;

    const empList = await employee.getEmployeeList();
    prompts.updateEmpManagerQuestions[0].choices = empList;

    inquirer.prompt(prompts.updateEmpManagerQuestions)
    .then(response => {        
        const employee = new Employee(response);
        employee.updateEmpManager(initiateApp);
        console.log(`${COLOR.fgGreen}${response.empName}'s manager has been updated.${COLOR.reset}`);      

    });
}

async function callDeleteDept() {
    const department = new Department();
    const deptList = await department.getDepartmentList();
    prompts.deleteDeptQuestions.choices = deptList;

    inquirer.prompt(prompts.deleteDeptQuestions)
    .then(response => {
        const department = new Department(response.deptName);
        department.deleteDepartment();
        console.log(`${COLOR.fgGreen}${response.deptName} department has been deleted.${COLOR.reset}`);
        initiateApp();
    })
}

async function callDeleteRole() {
    const role = new Role();
    const roleList = await role.getRoleList();
    prompts.deleteRoleQuestions.choices = roleList;

    inquirer.prompt(prompts.deleteRoleQuestions)
    .then(response => {
        const role = new Role(response.roleName);
        role.deleteRole();
        console.log(`${COLOR.fgGreen}${response.roleName} role has been deleted.${COLOR.reset}`);
        initiateApp();
    })
}

async function callDeleteEmp() {
    const employee = new Employee();
    const empList = await employee.getEmployeeList();
    prompts.deleteEmpQuestions.choices = empList;

    inquirer.prompt(prompts.deleteEmpQuestions)
    .then(response => {
        const employee = new Employee(response.empName);
        employee.deleteEmployee();
        console.log(`${COLOR.fgGreen}${response.empName} has been deleted.${COLOR.reset}`);
        initiateApp();
    });
}

async function callBudget() {
    const department = new Department();
    const deptList = await department.getDepartmentList()
    prompts.budgetQuestions.choices = deptList;

    inquirer.prompt(prompts.budgetQuestions)
    .then (response => {
        const department = new Department (response.deptName);
        department.getBudget(initiateApp);
    });
}

initiateApp();