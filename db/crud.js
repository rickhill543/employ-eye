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

// function that creates employees and writes them to the database
exports.createEmp = function createEmployee(mainMenu) {
  // prompts user for new employee information
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employees first name? (Required)',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          console.log('Please enter the employees first name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employees last name? (Required)',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          console.log('Please enter the employees last name');
          return false;
        }
      }
    },
    {
      type: 'list',
      message: 'What is the employees role?',
      name: 'role',
      choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Legal Team lead', 'Lawyer', 'Accountant']
    },
    {
      type: 'list',
      message: 'Who is the employees manager?',
      name: 'manager',
      choices: ['--- No Manager ---', 'John Doe', 'Mike Chan', 'Malia Brown']
    }
  ])
  .then(function(response) {
    function createEmpInner() {
      console.log('Inserting a new employee...\n');

      let roleChoice;
      if (response.role == "Sales Lead") {roleChoice=1}
      if (response.role == "Salesperson") {roleChoice=2}
      if (response.role == "Lead Engineer") {roleChoice=3}
      if (response.role == "Software Engineer") {roleChoice=4}
      if (response.role == "Legal Team lead") {roleChoice=5}
      if (response.role == "Lawyer") {roleChoice=6}
      if (response.role == "Accountant") {roleChoice=7}

      let managerChoice;
      if (response.manager == "--- No Manager ---") {managerChoice=1}
      if (response.manager == "John Doe") {managerChoice=2}
      if (response.manager == "Mike Chan") {managerChoice=3}
      if (response.manager == "Malia Brown") {managerChoice=4}

      // writes the new employee to the database
      const query = connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: `${response.firstName}`,
          last_name: `${response.lastName}`,
          role_id: `${roleChoice}`,
          manager_id: `${managerChoice}`
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' employee inserted!\n');
          mainMenu();
        }
      );
    }
    createEmpInner();
  })
  .catch(function (error) {
    console.log(error);
  })
};

// function that creates departments and writes them to the database
exports.createDept = function createDepartment(mainMenu) {
  // prompts user for new department information
  inquirer.prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'What is the name of the department (Required)',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          console.log('Please enter the name of the department');
          return false;
        }
      }
    }
  ])
  .then(function(response) {
    function createDeptInner() {
      console.log('Inserting a new dept...\n');

      // writes the new department to the database
      const query = connection.query(
        'INSERT INTO department SET ?',
        {
          dept: `${response.deptName}`
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' department inserted!\n');
          mainMenu();
        }
      );
    }
    createDeptInner();
  })
  .catch(function (error) {
    console.log(error);
  })
};

// function that creates roles and writes them to the database
exports.createRole = function createRoleLoc(mainMenu) {
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;

    // new arrays to destructure database
    let deptTitleAry = [];
    let deptIdAry = [];

    for (i=0; i<res.length;i++) {
      deptTitleAry.push(res[i].dept);
      deptIdAry.push(res[i].id);
    }

  // prompts user for new role information
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the tite of this role? (Required)',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          console.log('Please enter the title of this role');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary for this role? (Required)',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          console.log('Please enter the salary for this role');
          return false;
        }
      }
    },
    {
      type: 'list',
      message: 'What department does this role belong too?',
      name: 'department',
      choices: deptTitleAry
    }
  ])
  .then(function(response) {
    function createRoleInner() {
      console.log('Inserting a new role...\n');

      // cleaner way of isolating database information
      let roleChoice;
      for (i=0; i<deptIdAry.length; i++) {
        if(response.department == deptTitleAry[i]) {
          roleChoice = deptIdAry[i];
        }
      }

      // writes the new role to the database
      const query = connection.query(
        'INSERT INTO role SET ?',
        {
          title: `${response.roleTitle}`,
          salary: `${response.roleSalary}`,
          department_id: `${roleChoice}`
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' role inserted!\n');
          mainMenu();
        }
      );
    }
    createRoleInner();
  })
  .catch(function (error) {
    console.log(error);
  })
});
};

// function that updates employees and writes them to the database
exports.updateEmpRole = function updateEmployeeRole(mainMenu) {
  connection.query('SELECT * FROM employee', function(err, res) {
    if (err) throw err;

    // empty arrays to destructure database and concatenate strings for better user experience
    let empFirstName = [];
    let empLastName = [];
    let empId = [];
    let empFullName = [];

    for (i=0; i<res.length;i++) {
      empFirstName.push(res[i].first_name);
      empLastName.push(res[i].last_name);
      empFullName.push(res[i].first_name + ' ' + res[i].last_name);
      empId.push(res[i].id);
    }

    // prompts user for update information
  inquirer.prompt([
    {
      type: 'list',
      message: 'Which employee would you like to update?',
      name: 'employee',
      choices: empFullName
    },
    {
      type: 'list',
      message: 'Which role should be updated?',
      name: 'role',
      choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Legal Team lead', 'Lawyer', 'Accountant']
    }
  ])
  .then(function(response) {
    function updateRoleInner() {
      console.log('Inserting a new role...\n');

      // isolates input to be used
      let roleChoice;
      if (response.role == "Sales Lead") {roleChoice=1}
      if (response.role == "Salesperson") {roleChoice=2}
      if (response.role == "Lead Engineer") {roleChoice=3}
      if (response.role == "Software Engineer") {roleChoice=4}
      if (response.role == "Legal Team lead") {roleChoice=5}
      if (response.role == "Lawyer") {roleChoice=6}
      if (response.role == "Accountant") {roleChoice=7}

      let empChoice;
      for (i=0; i<empFullName.length; i++) {
        if(response.employee == empFullName[i]) {
          empChoice = empId[i];
        }
      }

      // update the employee with new role information
      const query = connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
          {
            role_id: roleChoice
          },
          {
            id: empChoice
          }
        ],
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' employee updated!\n');
          mainMenu();
        }
      );
    }
    updateRoleInner();
  })
  .catch(function (error) {
    console.log(error);
  })
});
};