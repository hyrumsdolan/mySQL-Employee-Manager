USE employee_db;

INSERT INTO departments (name) VALUES
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales'),
('Finance');

INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 70000.00, 1),
('HR Manager', 65000.00, 2),
('Marketing Coordinator', 60000.00, 3),
('Sales Representative', 55000.00, 4),
('Accountant', 50000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Johnson', 3, 1),
('Michael', 'Brown', 4, 2),
('Sarah', 'Davis', 5, 3);
