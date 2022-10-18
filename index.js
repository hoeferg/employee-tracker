const express = require('express');
const db = require('./db/connection')
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');



function startQ() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'startQ',
            message: 'What would you like to do?',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
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
        console.table(results);
    })
};

function allRoles() {
    // I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    })
};

function allEmployees() {
    // I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
    })
};

function addDepartment() {
    // I am prompted to enter the name of the department and that department is added to the database
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartmentQ',
            message: 'What department would you like to add?',
        }
    ]).then(answers => {
    db.query(`INSERT INTO department (id, name) VALUE ('id', 'addDepartmentQ'`,
        function (err, results) {
            console.log(results);
        })
})};


function addRole() {
    // I am prompted to enter the name, salary, and department for the role and that role is added to the database
};

function addEmployee() {
    // I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
};

function updateEmployee() {
    // I am prompted to select an employee to update and their new role and this information is updated in the database
};