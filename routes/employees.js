var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var generator = require('generate-password')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "a01026675-test-db.cf9zyau6meiw.us-west-2.rds.amazonaws.com",
  user: "node",
  password: "password",
  database: "unplug_and_thrive"
})

function getConnection() {
  return pool
}

router.get("/", (req, res) => {
  const queryString = "SELECT * FROM employee"
  getConnection().query(queryString, (err, rows, fields) => {
      if (err) {
          console.log("Failed to query for employees: " + err)
          res.sendStatus(500)
          res.end()
          return
      }

      console.log("I think we fetched it")
      res.json(rows)
      return
  })
})


router.get("/:id", (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const userID = req.params.id
  const queryString = "SELECT * FROM employee WHERE employee_id = ?"
  getConnection().query(queryString, [userID], (err, rows, fields) => {
    
      if (err) {
          console.log("Failed to query for users: " + err)
          res.sendStatus(500)
          res.end()
          return
      }

      // if (rows.length != 1) {
      //   res.json({error: "User with ID: " + userID + " not found."})
      //   res.end()
      // }

      console.log("I think we fetched it")
      console.log(rows);
      res.json(rows)
      return
  })

  // res.end()
})

router.post('/create', (req, res) => {
  console.log("Trying to create a new user")

  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const address = req.body.address
  const zip_code = req.body.zip_code
  const phone_number = req.body.phone_number.replace(/-/g, "")
  const email = req.body.email

  const user_name = (first_name[0] + last_name).toLowerCase()
  const password = generator.generate({
      length: 10,
      numbers: true
  });

  const queryString = "INSERT INTO employee (first_name, last_name, user_name, password, address, zip, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

  getConnection().query(queryString, [first_name, last_name, user_name, password, address, zip_code, phone_number, email], (err, results, field) => {
      if (err) {
          console.log("Failed to insert new user: " + err)
          res.sendStatus(500)
      }

      console.log("Inserted a new user with id: ", results.insertId)
      res.end()
      return
  })

  res.end();
  return
})

module.exports = router