var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var db = require('../db/db');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "a01026675-test-db.cf9zyau6meiw.us-west-2.rds.amazonaws.com",
//   user: "node",
//   password: "password",
//   database: "unplug_and_thrive"
// })

// function db {
//   return pool
// }

router.get("/", (req, res) => {
  const queryString = "SELECT * FROM service"
  db.query(queryString, (err, rows, fields) => {
      if (err) {
          console.log("Failed to query for services: " + err)
          res.sendStatus(500)
          res.end()
          return
      }
      res.json(rows)
  })
})

router.get("/:id", (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const userID = req.params.id
  const queryString = "SELECT * FROM service WHERE service_id = ?"
  db.query(queryString, [userID], (err, rows, fields) => {
    
      if (err) {
          console.log("Failed to query for customers: " + err)
          res.sendStatus(500)
          res.end()
          return
      }

      // if (rows.length != 1) {
      //   res.json({error: "User with ID: " + userID + " not found."})
      //   res.end()
      // }

      console.log("I think we fetched it")
      res.json(rows)
  })

  // res.end()
})

router.post('/create', (req, res) => {

  const name = req.body.name
  const provider = req.body.provider
  const description = req.body.description
  const manual_link = req.body.manual_link

  const queryString = "INSERT INTO service (name, provider, description, manual_link) VALUES (?, ?, ?, ?)"
  db.query(queryString, [first_name, last_name, user_name, password, address, zip_code, phone_number, email], (err, results, field) => {
      if (err) {
          console.log("Failed to insert new service: " + err)
          res.sendStatus(500)
      }

      console.log("Inserted a new user with service: ", results.insertId)
      res.end()
  })

  res.end();
})

module.exports = router