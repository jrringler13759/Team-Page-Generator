const validator = require("email-validator");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./lib/htmlRenderer");

const employees = [];


//Prompt manager for their information
function promptManager() {
    return inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== ""){
                    return true;
                } else {
                    return "You must enter a name"
                }

            }   
        },

        { 
            type: "input",
            name: "id",
            message: "What is your manager's id number?",
            // validate: answer => {
            //     if (typeOf(answer) !== "number"){
            //         return "You must enter a number.";
            //     }
            // }
            
        },

        { 
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            // validate: function(answer){
            //     validator.validate(answer);
            // }
        },

        { 
            type: "input",
            name: "office",
            message: "What is the manager's office number?",
        }
    ])
}

promptManager()
.then(function(answers){
    const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
    employees.push(manager);
    chooseNext();
})
.catch(function(err){
    console.log(err);
})


//If engineer is chosen these questions will be asked next
function promptEngineer(){
    return inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your engineers's name?",
            // validate: function(answer){
            //     if (answer == ""){
            //         return "You must enter a name.";
            //     } 
            // }   
        },

        { 
            type: "input",
            name: "id",
            message: "What is your engineer's id number?",
            // validate: function(answer){
            //     if (typeOf(answer) !== "number"){
            //         return "You must enter a number.";
            //     }
            // } 
        },

        { 
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
            // validate: function(answer){
            //     validator.validate(answer);
            // }
        },

        { 
            type: "input",
            name: "github",
            message: "What is the engineer's github username?",
        }
    ])

    .then(function(answers){
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        chooseNext();
    })
    .catch(function(err){
        console.log(err);
    })
}




//If the intern is chosen these questions will be asked next
function promptIntern(){
    return inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your intern's name?",
            // validate: function(answer){
            //     if (answer == ""){
            //         return "You must enter a name.";
            //     } 
            // }   
        },

        { 
            type: "input",
            name: "id",
            message: "What is your intern's id number?",
            // validate: function(answer){
            //     if (typeOf(answer) !== "number"){
            //         return "You must enter a number.";
            //     }
            // }
            
        },

        { 
            type: "input",
            name: "email",
            message: "What is your intern's email?",
            // validate: function(answer){
            //     validator.validate(answer);
            // }
        },

        { 
            type: "input",
            name: "school",
            message: "What is the intern's school?",
        }
    ])

    .then(function(answers){
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        chooseNext();
    })
    .catch(function(err){
        console.log(err);
    })
}


//Determine the next employee if they want it
function chooseNext () {
    inquirer.prompt ([
        {
            type: "list",
            name: "next",
            message: "Which type of employee would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to enter another employee"]
        }
    ])
    .then(function(ans){
       
        switch (ans.next) {
            case "Engineer":
                promptEngineer();
                break;
            case "Intern":
                promptIntern();
                break;
            default:
                const renderHtml = render(employees);
                fs.writeFile(outputPath, renderHtml, function(err){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("The file has been written");
                    }
                })
        }
    })
}

