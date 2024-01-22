USE hogwarts_db;

INSERT INTO departments (name) VALUES
('Gryffindor'),
('Hufflepuff'),
('Ravenclaw'),
('Slytherin');

INSERT INTO roles (title, salary, department_id) VALUES
('Headmaster', 60000, NULL),
('Deputy Headmistress', 55000, 1),
('Gamekeeper', 35000, 1),
('DADA Professor', 50000, 1),
('Potions Master', 45000, 4),
('Herbology Researcher', 40000, 2),
('Charms Professor', 42000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Albus', 'Dumbledore', 1, NULL),
('Minerva', 'McGonagall', 2, 1),
('Rubeus', 'Hagrid', 3, 2),
('Harry', 'Potter', 4, 2),
('Horace', 'Slughorn', 5, 2),
('Pomona', 'Sprout', 6, 1),
('Filius', 'Flitwick', 7, 1);
