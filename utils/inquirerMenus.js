const inquirer = require('inquirer');
const connection = require('../db/config');
const Department = require('../lib/Department');
const Employee = require('../lib/Employee');
const Query = require('../lib/Query');
const Role = require('../lib/Role');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        // ... other choices ...
        'Update an Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Department Budget',
        'Exit'
      ]
    }
  ])
  .then(answer => {
    // ... existing switch cases ...
    switch (answer.action) {
      // ... existing cases ...
      case 'Update Employee Manager':
        updateEmployeeManager();
        break;
      case 'View Employees by Manager':
        viewEmployeesByManager();
        break;
      case 'View Employees by Department':
        viewEmployeesByDepartment();
        break;
      case 'Delete Department':
        deleteDepartment();
        break;
      case 'Delete Role':
        deleteRole();
        break;
      case 'Delete Employee':
        deleteEmployee();
        break;
      case 'View Department Budget':
        viewDepartmentBudget();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${answer.action}`);
        mainMenu();
        break;
    }
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
    mainMenu();
  });
}

  function viewDepartments() {
    const department = new Department();
    department.viewAllDepartments()
        .then(() => mainMenu())
        .catch(err => console.error(err));
}
  
function viewRoles() {
  const role = new Role();
  role.viewAllRoles()
      .then(() => mainMenu())
      .catch(err => console.error(err));
}

function viewEmployees() {
  const employee = new Employee();
  employee.viewAllEmployees()
      .then(() => mainMenu())
      .catch(err => console.error(err));
}

function addDepartment() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: 'What is the name of the department?'
      }
  ]).then(answer => {
      const department = new Department();
      department.addDepartment(answer.name)
          .then(() => {
              mainMenu();
          })
          .catch(err => console.error(err));
  });
}

function addRole() {
  // Fetch departments first
  const department = new Department();
  department.getDepartments()
    .then(departments => {
      // Prompt for role details
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for this role?',
          validate: function(value) {
              var number = parseFloat(value);
              if (isNaN(number) || number <= 0) {
                  return 'Please enter a valid positive number for salary';
              }
              return true;
          }
      },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does this role belong to?',
          choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
        }
      ])
      .then(answers => {
        const role = new Role();
        role.addRole(answers.title, answers.salary, answers.departmentId)
          .then(() => {
            mainMenu();
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}
  
function addEmployee() {
  Promise.all([
      new Role().getRoles(),
      new Employee().getEmployees()
  ])
  .then(([roles, employees]) => {
      inquirer.prompt([
          {
              type: 'input',
              name: 'firstName',
              message: "What is the employee's first name?"
          },
          {
              type: 'input',
              name: 'lastName',
              message: "What is the employee's last name?"
          },
          {
              type: 'list',
              name: 'roleId',
              message: "What is the employee's role?",
              choices: roles.map(role => ({ name: role.title, value: role.id }))
          },
          {
            type: 'list',
            name: 'managerId', // Ensure this property exists for every question
            message: "Who is the employee's manager?",
            choices: employees.map(emp => ({ 
              name: emp.name, // Use 'name' instead of concatenating 'first_name' and 'last_name'
              value: emp.id 
          })).concat([{ name: 'None', value: null }])
          
          
        }
        
      ])
      .then(answers => {
          const employee = new Employee();
          employee.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
              .then(() => {
                  mainMenu();
              })
              .catch(err => console.error(err));
      });
  })
  .catch(err => console.error(err));
}

  
function updateEmployeeRole() {
  Promise.all([
      new Employee().getEmployees(),
      new Role().getRoles()
  ])
  .then(([employees, roles]) => {
      inquirer.prompt([
          {
              type: 'list',
              name: 'employeeId',
              message: "Which employee's role do you want to update?",
              choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
          },
          {
              type: 'list',
              name: 'roleId',
              message: "Which role do you want to assign to the selected employee?",
              choices: roles.map(role => ({ name: role.title, value: role.id }))
          }
      ])
      .then(answers => {
          const employee = new Employee();
          employee.updateEmployeeRole(answers.employeeId, answers.roleId)
              .then(() => {
                  console.log(`Updated employee's role in the database`);
                  mainMenu();
              })
              .catch(err => console.error(err));
      });
  })
  .catch(err => console.error(err));
}




  module.exports = {
    mainMenu,
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};