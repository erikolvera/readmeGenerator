const inquirer = require('inquirer');
const fs = require('fs');
const { title } = require('process');


const generateREADME = ({title, description, installation, usage, license, contributing, guidelines, test, questions}) =>

`# ${title}

## Description

${description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)

## Installation

${installation}

## Usage

${usage}

## License

${renderBadge(license)}


## Contributing

${contributing}
`

const renderBadge = function(license) {
    //switch statements are alternatives to if statements
    switch(license) {
        case "MIT License" : 
        return "[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)"
        case "GPLv3 License" :
        return "[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)"
        case "Unlicense" :
        return "[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)";

        default:
            return "No matching cases"
    }
}

inquirer
  .prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a short description of your project.',
    },

    {
        type: 'input',
        name: 'installation',
        message: 'Describe how to install this application.',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please describe how to use this application.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose one of the following licenses for the project.',
        choices: ['MIT License', 'GPLv3 License', 'Unlicense']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please provide contributing instructions.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Are there any tests associated with this project?',
    },
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your GitHub username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.',
    }
  ])
  .then((answers) => {
    const READMEContent = generateREADME(answers);

    fs.writeFile('README.md', READMEContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });
