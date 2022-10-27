# Team/About Us Page Generator

## Outline

This NodeJS progam allows you to create an html page template based on command line promps. It will first ask for the manager's info and then will give you options for managing the rest of your employees. From thsi point foward you can add more employees and delete employees. when finished, It will start generation for a barebones HTML Page with working links to emails and githubs.

[Tutorial Video (Tests Shown)]()


## Code Notes

The original project stated that we should have a class for each type of employee, however, when originally programming this, I found it easier to have one class that has a "Type" variable(stores the type of employee) and a "Data" variable (stores the employee type's uniqe data: office number, Github, and School). I have also created a "SetAs" Method to get the type and data. if you do not use the "SetAs" Method, the employee type will default to "Employee"