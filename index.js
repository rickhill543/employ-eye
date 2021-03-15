// dependencies
const inquirer = require('inquirer');
const crud = require('./db/crud');
require('console.table');

// greeting function that calls the main menu on load
function greeting() {
    console.log(`
    
    ______ __  __ _____  _      ______     __  ________     ________ 
    |  ____|  |/  |  __ || |    / __ | |   / / |  ____| |   / /  ____|
    | |__  | |  / | |__) | |   | |  | | |_/ /  | |__   | |_/ /| |__   
    |  __| | ||/| |  ___/| |   | |  | ||   /   |  __|   |   / |  __|  
    | |____| |  | | |    | |___| |__| | | |    | |____   | |  | |____ 
    |______|_|  |_|_|    |______|____/  |_|    |______|  |_|  |______|
    
    `)
    mainMenu();
}
greeting();

// main menu function that prompts user through UI
function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "READ_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "READ_ROLES"
                },
                {
                    name: "View All Departments",
                    value: "READ_DEPARTMENTS"
                },
                {
                    name: "Add Employee",
                    value: "CREATE_EMPLOYEE"
                },
                {
                    name: "Add Role",
                    value: "CREATE_ROLE"
                },
                {
                    name: "Add Department",
                    value: "CREATE_DEPARTMENT"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ])
    // series of if statements to call the correct function
    .then(function(input) {
        if (input.choice == "READ_EMPLOYEES") {crud.readEmp(mainMenu);}
        if (input.choice == "READ_ROLES") {crud.readRoles(mainMenu);}
        if (input.choice == "READ_DEPARTMENTS") {crud.readDept(mainMenu);}
        if (input.choice == "CREATE_EMPLOYEE") {crud.createEmp(mainMenu);}
        if (input.choice == "CREATE_ROLE") {crud.createRole(mainMenu);}
        if (input.choice == "CREATE_DEPARTMENT") {crud.createDept(mainMenu);}
        if (input.choice == "UPDATE_EMPLOYEE_ROLE") {crud.updateEmpRole(mainMenu);}
        if (input.choice == "QUIT") {ending();}
    })
    .catch(function (error) {
        console.log(error);
      })
}

// function to end the app
function ending() {
    console.log("Bye!");
    return;
}