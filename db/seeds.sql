INSERT INTO department (id, name)
VALUES (1, "John Smith"),
        (2, "Dan Jones"),
        (3, "Shelby Herns"),
        (4, "David Burn"),
        (5, "Chel Tan");

INSERT INTO role (id, title, salary)
VALUES (1, "Manager", 150000),
        (2, "Enginner" 200000),
        (3, "Intern" 50000),
        (4, "HR" 150000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John" "Smith", 1, 1),
        (2, "Dan" "Jones", 2, 2),
        (3, "Shelby" "Herns", 2),
        (4, "David" "Burn", 3),
        (5, "Chel" "Tan",  4);