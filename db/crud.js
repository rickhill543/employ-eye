// dependencies
const inquirer = require('inquirer');
const {connection} = require('./connection');
require('console.table');

// function that reads employees from the database
exports.readEmp = function readEmployees(mainMenu) {
  console.log(`
......................................
███ █▄┼▄█ ███ █┼┼ ███ █┼█ ███ ███ ███
█▄┼ █┼█┼█ █▄█ █┼┼ █┼█ █▄█┼█▄┼ █▄┼ █▄▄
█▄▄ █┼┼┼█ █┼┼ █▄█ █▄█ ┼█┼ █▄▄ █▄▄ ▄▄█
......................................
`);
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.manager_name, department.dept FROM employee INNER JOIN manager ON employee.manager_id=manager.id INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id ORDER BY employee.id;', function(err, res) {
    if (err) throw err;
    // displays table when option is selected
    console.table(res);
    mainMenu();
  });
};

// function that reads roles from the database
exports.readRoles = function readRolesLoc(mainMenu) {
  console.log(`
...................................
┼██ ███ ██▄ ┼┼ ███ ███ █┼┼ ███ ███
┼┼█ █┼█ █▄█ ┼┼ █▄┼ █┼█ █┼┼ █▄┼ █▄▄
█▄█ █▄█ █▄█ ┼┼ █┼█ █▄█ █▄█ █▄▄ ▄▄█
...................................
`);
  connection.query('SELECT role.id, role.title, role.salary, department.dept FROM role INNER JOIN department ON role.department_id=department.id ORDER BY role.id', function(err, res) {
    if (err) throw err;
    // displays table when option is selected
    console.table(res);
    mainMenu();
  });
};

// function that reads departments from the database
exports.readDept = function readDepartments(mainMenu) {
  console.log(`
...............................................
██▄ ███ ███ ███ ███ ███ █▄┼▄█ ███ █┼┼█ ███ ███
█┼█ █▄┼ █▄█ █▄█ █▄┼ ┼█┼ █┼█┼█ █▄┼ ██▄█ ┼█┼ █▄▄
███ █▄▄ █┼┼ █┼█ █┼█ ┼█┼ █┼┼┼█ █▄▄ █┼██ ┼█┼ ▄▄█
...............................................
`);
  connection.query('SELECT * FROM department ORDER BY department.id;', function(err, res) {
    if (err) throw err;
    // displays table when option is selected
    console.table(res);
    mainMenu();
  });
};