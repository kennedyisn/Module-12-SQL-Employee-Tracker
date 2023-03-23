const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const updatedTable = require('console.table');
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
        switch (answer.Menu) {
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

const db = mysql.createConnection(
    {
      host: 'localhost',
      // username
      user: 'root',
      // password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   // selectorMenu();
});

// Display all departments
function viewDepartments() {
    console.log('Displaying all departments');

    db.query('SELECT * FROM departments', function(err, res) {
        if (err) throw err;
        console.table(res);
        //console.log(updatedTable.getTable(res));
        selectorMenu();
    });
}

// Display all roles
function viewRoles() {
    console.log('Displaying all roles');

    db.query('SELECT * FROM roles', function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log(updatedTable.getTable(res));
        selectorMenu();
    });
}

// Display all employees
function viewEmployees() {
    console.log('Displaying all employees');

    db.query('SELECT * FROM employees', function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log(updatedTable.getTable(res));
        selectorMenu();
    });
}

// Add a department
function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?',
        }
    )
    .then((answer) => {
        db.query(
            'INSERT INTO departments SET ?',
            {
                name: answer.department,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} department added!\n`);
                selectorMenu();
            }
        );
    });
}

// Add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?',
        },

        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
        },

        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID for this role?',
        }
    ])
    .then((answer) => {
        db.query(
            'INSERT INTO roles SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} role added!\n`);
                selectorMenu();
            }
        );
    })
}

// Add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID for this employee?',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID for this employee?',
        }
    ])
    .then((answer) => {
        db.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee added!\n`);
                selectorMenu();
            }
        );
    })

}

// Update an employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee you would like to update?',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role ID for this employee?',
        }
    ])
    .then((answer) => {
        db.query(
            'UPDATE employees SET ? WHERE ?',
            [
                {
                    role_id: answer.role_id,
                },
                {
                    id: answer.employee_id,
                }
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee updated!\n`);
                selectorMenu();
            }
        );
    })
}

// Runs the application
function init() {
    selectorMenu();   
}
  
// Function call to initialize app
init();