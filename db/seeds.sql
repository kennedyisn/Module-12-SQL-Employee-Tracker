INSERT INTO departments (name)
VALUES ('Legal'),
       ('Marketing'),
       ('Engineering'),
       ('Finance'),
       ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lawyer', 120000, 1),
       ('Legal Analyst', 80000, 1),
       ('Social Media Marketing Coordinator', 45000, 2),
       ('Digital Strategist', 85000, 2),
       ('Senior Developer', 165000, 3),
       ('Junior Software Engineer', 70000, 3),
       ('Accountant', 90000, 4),
       ('Financial Analyst', 55000, 4),
       ('Human Resources Manager', 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Denzel', 'Washington', 1, NULL),
       ('Tom', 'Hanks', 2, 1),
       ('Christian', 'Bale', 3, NULL),
       ('Jonah', 'Hill', 4, 3),
       ('Jesse', 'Eisenberg', 5, NULL),
       ('Andrew', 'Garfield', 6, 5),
       ('Ben', 'Affleck', 7, NULL),
       ('Leo', 'Dicaprio', 8, 7),
       ('Richard', 'Hansen', 9, NULL);