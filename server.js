const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const dotenv = require('dotenv').config();

const app = express();

function selectorMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'Menu',
            message: 'How would you like to proceed?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.menu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    })
}

const db = mySQL.createConnection(
    {
      host: 'localhost',
      // username
      user: 'root',
      // password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    init();
});

// Display all departments
function viewDepartments() {

}

// Display all roles
function viewRoles() {

}

// Display all employees
function viewEmployees() {

}

// Add a department
function addDepartment() {

}

// Add a role
function addRole() {

}

// Add an employee
function addEmployee() {

}

// Update an employee role
function updateEmployeeRole() {

}

// Runs the application
function init() {
    selectorMenu();
   
}
  
// Function call to initialize app
init();