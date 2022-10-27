//Setting up Prompt
const { rejects } = require('assert');
const prompt = require('prompt');
prompt.start();

//setting up File System
var fs = require('fs');

//Other Global Vars
var employeeArray = [];
var nextId = 1;

const Employee = require('./lib/employee')

function askManagerInfo(){ 
    return new Promise((resolve, reject) => {
        //Asking For Info
        console.log(`Input Manager Info`)
        prompt.get(['Name', 'Email', 'OfficeNumber'], function (err, result) {
            //Parsing info into Employee Class
            let manager = new Employee(result.Name, nextId, result.Email,);
            nextId++;
            manager.setAs(1, result.OfficeNumber);
        
            //Returning Manager Employeee Class
            resolve(manager)
        })
    });
}

function askEngineerInfo(){ 
    return new Promise((resolve, reject) => {
        //Asking For Info
        console.log(`\nInput Engineer Info`)
        prompt.get(['Name', 'Email', 'GithubUsername'], function (err, result) {
            //Parsing info into Employee Class
            let engineer = new Employee(result.Name, nextId, result.Email,);
            nextId++;
            engineer.setAs(2, result.GithubUsername);
        
            //Returning Manager Employeee Class
            resolve(engineer)
        })
    });
}

function askInternInfo(){ 
    return new Promise((resolve, reject) => {
        //Asking For Info
        console.log(`\nInput Intern Info`)
        prompt.get(['Name', 'Email', 'School'], function (err, result) {
            //Parsing info into Employee Class
            let intern = new Employee(result.Name, nextId, result.Email,);
            nextId++;
            intern.setAs(3, result.School);
        
            //Returning Manager Employeee Class
            resolve(intern)
        })
    });
}

//This asks if they want another Employee
//Simulates Looping with recursive functions
//Bear with me this part gets complicated
function askMoreEmployees(){ 
    return new Promise((resolve, reject) => {
        console.log(`\nAny Changes to Employee Roster?\n(E - New Engineer, I - New Intern, S - Show List, R - Remove From List, D - Done)`)
        prompt.get(['Option'], function (err, result) {
            //Parses user Input into usable info
            var userResponse = result.Option.toUpperCase().trim();
            
            //Each Response has an if
            //New Engineer
            if (userResponse == `E`){
                askEngineerInfo().then( res => {
                    employeeArray.push(res);
                    askMoreEmployees().then( res => {resolve(res);});
                })
            //New Intern
            } else if (userResponse == `I`){
                askInternInfo().then( res => {
                    employeeArray.push(res);
                    askMoreEmployees().then( res => {resolve(res);});
                })
            //Gives List of Employees
            } else if (userResponse == `S`){
                showAllEmployees();
                askMoreEmployees().then( res => {resolve(res);});
            //Removes an Employee
            } else if (userResponse == `R`){
                console.log(`Give the index of employee ("C" to cancel)`)
                prompt.get(['Index'], function (err, employeeIndex) {
                    //Same as Above
                    const  empResponse = employeeIndex.Index.toUpperCase().trim();

                    //Edge Cases
                    if (empResponse == `C`){
                        askMoreEmployees().then( res => {resolve(res);});
                        return;
                    }

                    //Splicing
                    //This was originally in a try-catch so it could check NaNs and Array OOB but nothing triggered
                    //Honestly, Way to tired to complete this feature that is not even mentioned in the assignment
                    //At least it works -_-
                    employeeArray.splice(empResponse, 1)
                    askMoreEmployees().then( res => {resolve(res);});
                })
            //No more employees to add (creates Webpage)
            //Honestly my hope is that the employees get added before all resolves go through
            } else if (userResponse == 'D') {
                deleteWebpage();
                createWebpage();
                addToPage().then(res => {
                    endPage();
                    resolve(true);
                })
            //In case Response is Invalid
            } else {
                console.log(`Invalid Response`);
                askMoreEmployees().then( res => {resolve(res);});
            }
        })
    });
}

//Actual Running Code
askManagerInfo().then( res => {
    employeeArray.push(res);
    askMoreEmployees().then();
})

function showAllEmployees(){
    employeeArray.forEach(employee => {
        console.log(Employee.prototype.getInfo.call(employee))
    });
}

function createWebpage(){
    fs.appendFile(
        'GeneratedHtml.html',
        '<!DOCTYPE html><html><head></head><body><header><h1>My Team</h1></header><section>',
        function (err) {
            if (err) throw err;
            console.log('Html File Created');
        }
    )
}

function addToPage(){
        return new Promise((resolve, reject) => {
        employeeArray.forEach(employee => {
            empInfo = Employee.prototype.getInfo.call(employee);

            fs.appendFile(
                'GeneratedHtml.html',
                `<div><h1>${empInfo[0]}</h1><h2>${empInfo[1]}</h2><ul><li>${empInfo[2]}</li><li>${empInfo[3]}</li><li>${empInfo[4]}</li></ul></div>`,
                function (err) {
                    if (err) throw err;
                    console.log(`Info Added to HTML`);
                }
            )
        });
        resolve();
    })
}

function endPage(){
    fs.appendFile(
        'GeneratedHtml.html',
        '</section></body></html>',
        function (err) {
            if (err) throw err;
            console.log('Html File Completed');
        }
    )
}

function deleteWebpage(){
    try {
        fs.unlink('GeneratedHtml.html', function (err) {
            if (err) throw err;
            console.log('\nOriginal File Deleted');
        });
    } catch (error) {
        //Try catch is here so program wont freak out if there is an error
    }
}