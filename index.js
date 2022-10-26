//Setting up Prompt
const { rejects } = require('assert');
const prompt = require('prompt');
prompt.start();

class Employee {
    //constructing
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;

        //0 - Unassigned, 1 - Manager, 2 - Engineer, 3 - Intern
        this.type = 0;
        console.log(this.type);
    }

    // Method to set as a type with accompanyinng data;
    setAs(type, data){
        console.log(this.type);
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

const askManagerInfo = new Promise((resolve, reject) => {
    //Asking For Info
    console.log(`Input Manager Info`)
    prompt.get(['Name', 'Email', 'OfficeNumber'], function (err, result) {
        console.log('Command-line input received:');
        console.log('  Name: ' + result.Name);
        console.log('  Email: ' + result.Email);
        console.log('  Off-Num: ' + result.OfficeNumber);
      

        //Parsing info into Employee Class
        const manager = new Employee(result.Name, 1, result.Email,);
        manager.setAs(1, result.OfficeNumber);
    
        //Returning Manager Employeee Class
        resolve(manager)
    })
});

//Actual Running Code
var employeeArray = [];
askManagerInfo.then( res => {
    employeeArray.push(res);
    console.log(Employee.prototype.getInfo.call(employeeArray[0]));
})

function createWebpage(){

}

function addToPage(employee){

}