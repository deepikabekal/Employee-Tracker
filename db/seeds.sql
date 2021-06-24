INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');


  INSERT INTO roles (title, salary, department_id)
  VALUES 
    ('Sales Lead', 100000, 1), 
    ('Sales Person', 80000, 1), 
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2), 
    ('Accountant', 125000, 3), 
    ('Legal Team Lead', 250000, 4), 
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 6),
  ('Jack', 'London', 3, 4),
  ('Robert', 'Bruce', 4, 8),
  ('Peter', 'Greenaway', 2, null),
  ('Derek', 'Jarman', 6, 1),
  ('Paolo', 'Pasolini', 2, null),
  ('Heathcote', 'Williams', 5, 2),
  ('Sandy', 'Powell', 7, null);
