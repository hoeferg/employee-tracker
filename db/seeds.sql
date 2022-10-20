INSERT INTO department (id, name)
VALUES (1, "HR"),
        (2, "Engineer"),
        (3, "Manager"),
        (4, "Intern"),
        (5, "Sales Associate");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 150000, 1),
        (2, "Enginner" 200000, 2),
        (3, "Intern" 50000, 3),
        (4, "HR" 150000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John" "Smith", 1, 1),
        (2, "Dan" "Jones", 2, 2),
        (3, "Shelby" "Herns", 2),
        (4, "David" "Burn", 3),
        (5, "Chel" "Tan",  4);