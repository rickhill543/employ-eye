INSERT INTO department (dept)
VALUES
  ('Sales'), 
  ('Engineering'), 
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4),
  ('Accountant', 125000, 3);

INSERT INTO manager (manager_name)
VALUES
  ('--- No Manager ---'),
  ('John Doe'),
  ('Mike Chan'),
  ('Malia Brown');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, 1),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, 3),
  ('Kevin', 'Tupik', 4, 4),
  ('Malia', 'Brown', 7, 1),
  ('Sarah', 'Lourd', 5, 2),
  ('Tom', 'Allen', 6, 4),
  ('Christian', 'Eckenrode', 3, 2),
  ('Tammer', 'Galal', 4, 4);