# Unplug And Thrive API

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


## *To be filled*
## *To be filled*
## *To be filled*
## *To be filled*

<!-- ## License
[MIT](https://choosealicense.com/licenses/mit/) -->