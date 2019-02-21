# Unplug And Thrive API
[![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express)  
[![Build Status](https://travis-ci.com/AJBuckle/UnplugAndThriveAPI.svg?token=xS9pAoyPyTQuATk6Sw97&branch=security)](https://travis-ci.com/AJBuckle/UnplugAndThriveAPI)  
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

An API built using [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/).

## Recommended Tools
[Postman](https://www.getpostman.com/): A tool to test the api endpoints.

[Visual Studio Code](https://code.visualstudio.com/): Powerful text editor with many useful extensions.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

## Starting API

To run the api:
```bash
npm start
```

By default, this app will use a file watcher [nodemon](https://nodemon.io/) and will be accessible from the URL: http://localhost:8080.

## Endpoints
POST http://localhost:8080/login
* Required in body: `employee_id`, `password`  
* Entry point of the API, returns the `Auth_Token` needed to access all protected endpoints

GET http://localhost:8080/employees 
* Required in header: 
  ```json
  "Authorization": "Bearer <Auth_Token>"
  ```
* Lists all employees, useful for admin dashboard

GET http://localhost:8080/employees/{id} 
* Required in header: 
  ```json
  "Authorization": "Bearer <Auth_Token>"
  ```
* Outputs an employee with `id` number specified

**To be filled**  
**To be filled**  
**To be filled**  
**To be filled**  




## Code Quality

This API's code structure and rules are based on [StandardJS](https://standardjs.com/). Please keep the integrity of the code by conforming to these rules. You can make sure that your code is acceptable by running `npm run lint`. What this does is run the command `standard --fix`. It should fix all the errors within the code that it can automatically. Errors such as: *non-camel case* variables or *variables that are initialized but never used* will have to be done manually. They are going to be in the output of the terminal.

If you are using VSCode, [this extension](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs) may be helpful for finding errors within StandardJS. Keep in mind that there are additional steps needed for it to work, which are outlined on the page of the extension.


<!-- ## License
[MIT](https://choosealicense.com/licenses/mit/) -->