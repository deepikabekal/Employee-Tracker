# Employee-Tracker

## Description
Developers frequently have to create interfaces that make it easy for non-developers to view and interact with information stored in databases. These interfaces are called content management systems (CMS). This is a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents
* [Walkthrough Video](#walkthroughvideo)
* [Installation](#installation)
* [Usage](#usage)
* [Techologies Used](#technologiesused)
* [User Story](#userstory)
* [Acceptance Criteria](#acceptancecriteria)
* [Contributing](#contributing)

## Walkthrough Video


## Installation
1. Make sure to have MySQL installed.
2. Clone this repo using ssh on your local machine.
```
git clone 
```
3. Open terminal and make sure to cd to the root of the repo.
4. Open the repo in your text editor.
5. Create a .env file at the root of the repo.
6. Copy and paste the following code in the .env file. Replace the value of DB_USER and DB_PW with your own credentials inside the quotes.
```
MYSQL_PASS = 'enter your MySQL password here'
```
7. Install all the dependencies.
```
npm install
```
8. Open MySQL shell using the below command in the terminal and enter your password when prompted.
```
mysql -u root -p
```
9. Run the below commands to create and use the database.
```
source db/db.sql;
USE employees_tracker;
source db/schema.sql;
source db/seeds.sql;
```
10. Exit the MySQL shell by running the below command.
```
exit
```

## Usage
1. Open terminal at the root of the project.
2. Run the server using the below command.
```
node server.js
```
3. Answer the prompts to interact with the app.

## Technologies
* Inquirer
* MySQL2
* Node.js
* console.table


## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Contributing
1. Fork the repo.
2. Add feature or make changes.
3. Make a pull request for review.
