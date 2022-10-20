const express = require('express');
const db = require('./db/connection')
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'yourpassword',
        database: 'employees_db'
    },

    connection.connect(err => {
        if (err) throw err;
        console.log(`Connected to the books_db database.`);
        welcome();
    }))

const roleList = `SELECT name, title FROM employee`
const employeeList = `SELECT first_name, last_name FROM employee`

function welcome() {
    console.log("****************************************")
    console.log("*                                      *")
    console.log("*         EMPLOYEE MANAGER             *")
    console.log("*                                      *")
    console.log("****************************************")
    startQ();
}

function startQ() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startQ',
            message: 'What would you like to do?',
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }
    ]).then(function (userInput) {
        switch (userInput.startQ) {
            case "view all department": allDepartments();
                break;

            case "view all roles": allRoles();
                break;

            case "view all employees": allEmployees();
                break;

            case "add a department": addDepartment();
                break;

            case "add a role": addRole();
                break;

            case "add an employee": addEmployee();
                break;

            case "update an employee role": updateEmployee();
                break;

            default: console.log("There was nothing selected");
        }
    })
}

function allDepartments() {
    // I am presented with a formatted table showing department names and department ids
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    }
    )
}


function allRoles() {
    // I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        if (err) {
            console.log(err);
        }
    }
    )
}

function allEmployees() {
    // I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    }
    )
}

function addDepartment() {
    // I am prompted to enter the name of the department and that department is added to the database
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department would you like to add?',
        }
    ]).then(answers => {
        db.query('INSERT INTO department (name) VALUE (?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allDepartments();
            })
    })
}


function addRole() {
    // I am prompted to enter the name, salary, and department for the role and that role is added to the database
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What is the name of role are you creating?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the roles salary?',
        },
        {
            type: 'input',
            name: 'addDept',
            message: 'What department is the role in?',
        },
    ]).then(answers => {
        db.query('INSERT INTO role (title, salary, department_id, ) VALUE (?, ?, ?, ?, ?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allRoles();
            })
    })
}
// TODO: add info to 

function addEmployee() {
    // I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    inquirer.prompt([
        {
            type: 'input',
            name: 'fName',
            message: 'What is the first name of the person you would like to add?',
        },
        {
            type: 'input',
            name: 'lName',
            message: 'What is the last name of the person you would like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is there salary?',
        },
        {
            type: 'input',
            name: 'addRole',
            message: roleList
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Are they a manager?',
            choices: ['yes', 'no']
        },
    ]).then(answers => {
        db.query('INSERT INTO employee (first_name, last_name, salary, title, manager) VALUE (?, ?, ?, ?, ?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allEmployees();
            })
    })
}

function updateEmployee() {
    // I am prompted to select an employee to update and their new role and this information is updated in the database
    inquirer.prompt([
        {
            type: 'list',
            name: 'updateEmp',
            message: 'Which employee would you like to update?',
            choices: employeeList
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their new role',
            choice: roleList
        },
        
    ]).then(answers => {
        db.query('INSERT INTO employee (first_name, last_name, title) VALUE (?,?,?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allEmployees();
            })
    })
}