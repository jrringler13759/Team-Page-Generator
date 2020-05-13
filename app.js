const validator = require("email-validator");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//what are these? Are we not using util to promisify?
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

    //ask the manager questions
    //ask if they want to add an employee
    //4th question depends on answer from 3rd question

    //employee to manager or just manager and then Engineer and Intern

function promptManager() {
    return inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your manager's name?"  
        },

        { 
            type: "input",
            name: "id",
            message: "What is your manager's id number?",
            validate: needANumber(userInput.id)
        },

        { 
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            validate: ""
        },

        { 
            type: "input",
            name: "office",
            message: "What is the manager's office number?",
            when: ""
        }
    ])
}

promptManager()
.then(function(answers){
//how do I get the employee questions to link to the 4th appropriate question?
    chooseNext();
})
.catch(function(err){
    console.log(err);
})


function chooseNext () {
    return inquirer.prompt ([
        {
            type: "list",
            name: "next",
            message: "Which type of employee would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to enter another employee"]
        },

        { 
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub username?" 
            when: (userInput) => {if(userInput.next === "Engineer"){
                
            }} 
        },

        { 
            type: "input",
            name: "school",
            message: "What is your intern's school?"  
        },

        
    ])
}












// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
