USE employeesDB;

INSERT INTO department (name)
VALUES("Sales");
INSERT INTO department (name)
VALUES("Engineering");
INSERT INTO department (name)
VALUES("Finance");
INSERT INTO department (name)
VALUES("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 7);
INSERT INTO role (title, salary, department_id)
VALUES ("Laywer", 190000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriquez", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kunal", "Singh", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Kash", 1, 1);