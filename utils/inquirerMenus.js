const inquirer = require('inquirer');
const connection = require('../db/config');

function mainMenu() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Exit'
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an Employee Role':
          updateEmployeeRole();
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
    console.log('Viewing all departments...');
    mainMenu();
  }
  
  function viewRoles() {
    console.log('Viewing all roles...');
    mainMenu();
  }
  
  function viewEmployees() {
    console.log('Viewing all employees...');
    mainMenu();
  }
  
  function addDepartment() {
    console.log('Adding a new department...');
    mainMenu();
  }
  
  function addRole() {
    console.log('Adding a new role...');
    mainMenu();
  }
  
  function addEmployee() {
    console.log('Adding a new employee...');
    mainMenu();
  }
  
  function updateEmployeeRole() {
    console.log('Updating employee role...');
    mainMenu();
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