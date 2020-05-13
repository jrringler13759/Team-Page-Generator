// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, school, id, email){
        //what do I put for id and email ref car extends vehicle activity
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school
    }
    getRole() {
        return "Intern";
    }
}

module.exports = Intern;