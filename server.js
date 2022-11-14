const mysql = require('mysql');
const inquirer = require('inquirer');
require("console.table");

// create sql connection
const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password:'',
    database:'employeesDB'
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);

    console.log("Employee Manager")
    questionPrompt();
});

function questionPrompt() {
    inquirer
    .prompt({
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    })
    .then (function ({ task }){
        switch(task){
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Quit":
                connection.end();
                break;
        }
    });
}
//views all employees
function viewAllEmployees(){
    console.log("Viewing employees\n");

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
	ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
	ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    questionPrompt();
  });
}
//adds employee
function addEmployee(){
    console.log("Adding Employee\n");

    var query =
    `SELECT r.id, r.title, r.salary 
      FROM role r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    console.table(res);
    console.log("Role To Add");

    promptChoices(roleChoices);
  });
}

//asks questions to add the employee
function promptChoices(roleChoices){
    inquirer
    .prompt([
        {
            type: "input",
            name:"first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message:"What is the employee's last name?"
        },
        {
            type:"list",
            name:"roleID",
            message:"What is the employee's role?",
            choices: roleChoices
        },
        {
            type:"input",
            name:"managerID",
            message:"Who is the employee's manager?"
        }
    ])
    .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleID,
            manager_id: answer.managerID,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Added successfully!\n");
  
            questionPrompt();
          });
      });
}

function updateEmployee(){
    console.log("Updating an employee");

    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role r
	    ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        JOIN employee m
	    ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);

    role(employeeChoices);
  });
}

function role(employeeChoices){

  console.log("Updating an role");

  var query =
    `SELECT r.id, r.title, r.salary 
    FROM role r`
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);
    console.log("roleArray to Update!\n")

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices,roleChoices){
    inquirer
    .prompt([
      {
        type: "list",
        name: "employeeID",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "roleID",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      connection.query(query,
        [ answer.roleID,  
          answer.employeeID
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          questionPrompt();
        });
    });
}

function viewAllRoles(){
    const query = `SELECT role.title, role.salary, department.name
                    FROM role
                    INNER JOIN department ON department.id = role.department_id`
   
    console.table(res);
                
}

function addRole(){
  var query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function(err, res){
      if(err) throw err;

      const departmentChoices = res.map(({id, name}) => ({
        value:id, name: `${id} ${name}`
      }));

      console.table(res);
      console.log("Deparment array!");

      addRoleQuestions(departmentChoices);
    });
}

function addRoleQuestions(departmentChoices){
  inquirer
  .prompt([
    {
      type:'input',
      name: 'roleTitle',
      message: 'What is the role title?'
    },
    {
      type:'input',
      name: 'roleSalary',
      message: 'What is the role salary'
    },
    {
      type: 'list',
      name: 'departmentID',
      message: 'What is the department',
      choices: departmentChoices
    },
  ])
  .then(function (answer) {
    var query = `INSERT INTO role SET ?`

    connection.query(query, {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentID
    },
    function (err,res) {
      if(err) throw err;

      console.table(res);
      console.log('Role Inserted');

      questionPrompt();
    });
  });
}
function viewAllDepartments(){
    const query = `SELECT department.name
    FROM department`

    console.table(res);
}

function addDepartment(){

}