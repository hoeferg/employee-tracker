const inquirer = require('inquirer');
const mysql = require('mysql2');

// required npm packages

// create connection to mysql
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'yourpassword',
        database: 'employees_db'
    });
// starts the program when it loads
connection.connect(function (err) {
    if (err) throw err
    console.log("Starting program")
    welcome();
})
// references in the seed
// function roleData() {
//     let roles = connection.query('SELECT * FROM role', (err, data) => {
//         return data
//         // for (let i = 0; i < data.length; i++) {
//         //     roles.push(data[i].title)
//         // }
//     }) 
//     console.log(roles)
// }
// roleData()


// const employeeList = connection.query(`SELECT first_name, last_name FROM employee`)

// starts questions
function welcome() {
    console.log("****************************************")
    console.log("*          WELCOME TO THE              *")
    console.log("*         EMPLOYEE MANAGER             *")
    console.log("*                                      *")
    console.log("****************************************")
    startQ();
}

// first set of questions
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
                "update an employee role",
                "end program"
            ]
        },
        // tells what each answer is suppose to go
    ]).then(function (choices) {
        switch (choices.startQ) {
            case "view all departments": allDepartments();
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

            case "end program": console.log("Good Bye!");
                break;

            default: console.log("There was nothing selected");

        }
    })
}

// selects all question
function allDepartments() {
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startQ();
    }
    )
}

// selects all roles
function allRoles() {
    connection.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startQ();
    })
}

// displays all employees
function allEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        startQ();
    }
    )
}

// add department to schema
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department would you like to add?',
        }
    ]).then(answers => {
        connection.query('INSERT INTO department (name) VALUE (?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allDepartments();
                startQ();
            })
    })
}

// adds a new role to schema
function addRole() {
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
        connection.query('INSERT INTO role (title, salary, department_id, ) VALUE (?, ?, ?, ?, ?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allRoles();
                startQ();
            })
    })
}

// adds new employee to schema
function addEmployee() {
    // connection.query("SELECT * FROM role", (err, data) => {


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
                type: 'list',
                name: 'addRole',
                message: "What is their role",
                choices: async function () {
                    
                    return await (await connection.promise().query('SELECT * FROM role'))[0].map(
                        roles => {
                            console.log(roles) 
                            return roles.title 
                        }
                    )
            }},
            {
                type: 'list',
                name: 'manager',
                message: 'Who is their manager?',
                // choices: function () {
                //     let managers = connection.query('SELECT * from ')

                // }
            },
        ]).then(answers => {
            connection.query('INSERT INTO employee (first_name, last_name, salary, title, manager) VALUE (?, ?, ?, ?, ?)',
                function (err, results) {
                    console.log(results);
                    if (err) throw err;
                    allEmployees();
                    startQ();
                })
        })
    // })
}


// updates employee info to schema
function updateEmployee() {
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
        connection.query('INSERT INTO employee (first_name, last_name, title) VALUE (?,?,?)',
            function (err, results) {
                console.log(results);
                if (err) throw err;
                allEmployees();
                startQ();
            })
    })
}