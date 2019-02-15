const express = require('express');
const router = express.Router();
var db = require('../db/db');

router.get("/", (req, res) => {
    const queryString = "SELECT * FROM service_order"
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
  
  router.get("/:order_id", (req, res) => {
    console.log("Fetching user with order_id: " + req.params.order_id)
  
    const order_id = req.params.order_id
    const queryString = "SELECT * FROM service WHERE order_id = ?"
    db.query(queryString, [order_id], (err, rows, fields) => {
      
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
  
//   router.post('/create', (req, res) => {
  
//     const name = req.body.name
//     const provider = req.body.provider
//     const description = req.body.description
//     const manual_link = req.body.manual_link
  
//     const queryString = "INSERT INTO service (name, provider, description, manual_link) VALUES (?, ?, ?, ?)"
//     db.query(queryString, [first_name, last_name, user_name, password, address, zip_code, phone_number, email], (err, results, field) => {
//         if (err) {
//             console.log("Failed to insert new service: " + err)
//             res.sendStatus(500)
//         }
  
//         console.log("Inserted a new user with service: ", results.insertId)
//         res.end()
//     })
  
//     res.end();
//   })
  
  module.exports = router