const Employee = require('../lib/employee')

describe("Employee Class", () => {
    describe("Initialize", () => {
        it("Should Create a new instance of Employee Based on Parameters" , () => {

            const testEmp = new Employee(`Jon`, 1, `Jonnydbeck1@gmail.com`);

            expect(testEmp.name).toEqual(`Jon`)  
        })
    })

    describe("Set As", () => {
        it("Should Update the class with extra data related to the employee type" , () => {

            const testEmp = new Employee(`Jon`, 1, `Jonnydbeck1@gmail.com`);
            testEmp.setAs(2, 'JonnyDBeck')

            expect(testEmp.data).toEqual(`JonnyDBeck`)  
        })
    })

    describe("GetInfo", () => {
        it("Should Return an array with all info within the class" , () => {

            const testEmp = new Employee(`Jon`, 1, `Jonnydbeck1@gmail.com`);
            testEmp.setAs(2, 'JonnyDBeck')

            expect(testEmp.getInfo()).toEqual(['Jon', "Engineer", 1, "Jonnydbeck1@gmail.com", "JonnyDBeck"])  
        })
    })
})