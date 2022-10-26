//Setting up Prompt
const { rejects } = require('assert');
const prompt = require('prompt');
prompt.start();

//Other Global Vars
var employeeArray = [];
var nextId = 1;

class Employee {
    //constructing
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;

        //0 - Unassigned, 1 - Manager, 2 - Engineer, 3 - Intern
        this.type = 0;
    }

    // Method to set as a type with accompanyinng data;
    setAs(type, data){
        this.type = type;
        this.data = data;
    }

    //Get Info From Class
    getInfo(){
        let fullType = "none";

        //Transfer type to string
        if (this.type == 1){
            fullType = "Manager";
        } else if(this.type == 2){
            fullType = "Engineer";
        } else if(this.type == 3){
            fullType = "Intern";
        }

        //Putting full data into array and returning it
        const allData = [this.name, fullType, this.id, this.email, this.data];
        return allData;
    }
}

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
        console.log(`Input Engineer Info`)
        prompt.get(['Name', 'Email', 'GithubUsername'], function (err, result) {
            //Parsing info into Employee Class
            let engineer = new Employee(result.Name, nextId, result.Email,);
            nextId++;
            engineer.setAs(1, result.GithubUsername);
        
            //Returning Manager Employeee Class
            resolve(engineer)
        })
    });
}

function askInternInfo(){ 
    return new Promise((resolve, reject) => {
        //Asking For Info
        console.log(`Input Intern Info`)
        prompt.get(['Name', 'Email', 'School'], function (err, result) {
            //Parsing info into Employee Class
            let intern = new Employee(result.Name, nextId, result.Email,);
            nextId++;
            intern.setAs(1, result.School);
        
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
        console.log(`Do you have another employee\n(E - New Engineer, I - New Intern, S - Show List, R - Remove From List, N - No More Employees)`)
        prompt.get(['Answer'], function (err, result) {
            //Parses user Input into usable info
            var userResponse = result.Answer.toUpperCase().trim();
            
            //Each Response has an if
            //New Engineer
            if (userResponse == `E`){
                askEngineerInfo().then( res => {
                    employeeArray.push(res);
                    askMoreEmployees();
                })
            //New Intern
            } else if (userResponse == `I`){
                askInternInfo().then( res => {
                    employeeArray.push(res);
                    askMoreEmployees();
                })
            //Gives List of Employees
            } else if (userResponse == `S`){
                showAllEmployees();
                askMoreEmployees();
            //Removes an Employee
            } else if (userResponse == `R`){
                console.log(`Give the index of employee ("C" to cancel)`)
                prompt.get(['Answer'], function (err, employeeIndex) {
                    //Same as Above
                    const  empResponse = employeeIndex.Answer.toUpperCase().trim();

                    //Edge Cases
                    if (empResponse == `C`){
                        askMoreEmployees();
                        return;
                    }

                    //Splicing
                    //This was originally in a try-catch so it could check NaNs and Array OOB but nothing triggered
                    //Honestly, Way to tired to complete this feature that is not even mentioned in the assignment
                    //At least it works -_-
                    employeeArray.splice(empResponse, 1)
                    askMoreEmployees();
                })
            //No more employees to add
            } else if (userResponse == 'N') {
                return;
            //In case Response is Invalid
            } else {
                console.log(`Invalid Response`);
                askMoreEmployees();
            }
        })
    });
}

//Actual Running Code
askManagerInfo().then( res => {
    employeeArray.push(res);
    askMoreEmployees().then( res => {
        console.log(employeeArray);
    })
})

function showAllEmployees(){
    employeeArray.forEach(employee => {
        console.log(Employee.prototype.getInfo.call(employee))
    });
}

function createWebpage(){

}

function addToPage(employee){

}