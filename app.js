const validator = require("email-validator");
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

const ids = [];

//Validations
const validateName = answer => {
    if (answer !== ""){
        return true;
    } else {
        return "You must enter a name."
    }
}  

const validateId = answer => {
    if (isNaN(answer)|| answer === ""){
        return "You must enter a number.";
    } else if (ids.includes(answer)) {
        return "That ID is already in use.";
    } else {
        return true;
    }
}

const validateEmail = answer => {
    if(validator.validate(answer)){
        return true;
    } else if (answer === ""){
        return "Please enter a valid email";
    }
}

const validateOffice = answer => {
    if (answer !== ""){
        return true;
    } else {
        return "You must an office number.";
    }
}   

const validateGithub = answer => {
    if (answer !== ""){
        return true;
    } else {
        return "You must enter a username.";
    }
}

const validateSchool = answer => {
    if (answer !== ""){
        return true;
    } else {
        return "You must enter a school.";
    }
}


//Prompt manager for their information
function promptManager() {
    return inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your manager's name?",
            validate: validateName
        },
        { 
            type: "input",
            name: "id",
            message: "What is your manager's id number?",
            validate: validateId
        },
        { 
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            validate: validateEmail
        },
        { 
            type: "input",
            name: "office",
            message: "What is the manager's office number?",
            validate: validateOffice
        }
    ])
}
promptManager()
.then(answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
    employees.push(manager);
    ids.push(answers.id);
    chooseNext();
})
.catch(function(err){
    console.log(err);
})


//If engineer is chosen these questions will be asked next
function promptEngineer(){
    inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your engineers's name?",
            validate: validateName 
        },
        { 
            type: "input",
            name: "id",
            message: "What is your engineers's id number?",
            validate: validateId            
        },
        { 
            type: "input",
            name: "email",
            message: "What is your engineers's email?",
            validate: validateEmail
        },
        { 
            type: "input",
            name: "github",
            message: "What is the engineer's github username?",
            validate: validateGithub
        }
    ])
    .then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        ids.push(answers.id);
        chooseNext();
    })
    .catch(function(err){
        console.log(err);
    })
};


//If the intern is chosen these questions will be asked next
function promptIntern(){
    inquirer.prompt ([
        { 
            type: "input",
            name: "name",
            message: "What is your intern's name?",
            validate: validateName
        },
        { 
            type: "input",
            name: "id",
            message: "What is your intern's id number?",
            validate: validateId
        },
        { 
            type: "input",
            name: "email",
            message: "What is your intern's email?",
            validate: validateEmail
        },
        { 
            type: "input",
            name: "school",
            message: "What is the intern's school?",
            validate: validateSchool
        }
    ])
    .then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        ids.push(answers.id);
        chooseNext();
    })
    .catch(function(err){
        console.log(err);
    })
};


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
    .then(ans => {
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
    .catch(function(err){
        console.log(err);
    })
};


