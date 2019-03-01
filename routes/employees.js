var express = require('express')
var router = express.Router()
var generator = require('generate-password')
var db = require('../db/db')
var jwt = require('jsonwebtoken')
/**
 *  TODO:
 *  Delete needs to be implemented 
 */

function verifyToken (req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken
    // Next middleware
    next()
  } else {
    // Forbidden
    res.sendStatus(403)
  }
}

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      const queryString = 'SELECT * FROM employee'
      db.query(queryString, (err, rows, fields) => {
        if (err) {
          console.log('Failed to query for employees: ' + err)
          res.sendStatus(500)
          res.end()
          return
        }

        console.log('I think we fetched it')
        res.json(rows)
      })
    }
  })
})

router.get('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      console.log('Fetching user with id: ' + req.params.id)

      const userID = req.params.id
      const queryString = 'SELECT * FROM employee WHERE employee_id = ?'
      db.query(queryString, [userID], (err, rows, fields) => {
        if (err) {
          console.log('Failed to query for users: ' + err)
          res.sendStatus(500)
          res.end()
          return
        }
        console.log('I think we fetched it')
        console.log(rows)
        res.json(rows)
      })
    }
  })
  // res.end()
})

// Create Employee
router.post('/create', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      console.log('Trying to create a new user')

      const firstName = req.body.first_name
      const lastName = req.body.last_name
      const address = req.body.address
      const zipCode = req.body.zip_code
      const phoneNumber = req.body.phone_number.replace(/-/g, '')
      const email = req.body.email

      const userName = (firstName[0] + lastName).toLowerCase()
      const password = generator.generate({
        length: 10,
        numbers: true
      })

      const queryString = 'INSERT INTO employee (first_name, last_name, user_name, password, address, zip, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

      db.query(queryString, [firstName, lastName, userName, password, address, zipCode, phoneNumber, email], (err, results, field) => {
        if (err) {
          console.log('Failed to insert new user: ' + err)
          res.sendStatus(500)
        }

        console.log('Inserted a new user with id: ', results.insertId)
        res.end()
      })
      res.end()
    }
  })
})

router.get('/welcome/:id', verifyToken, (req, res) => {
  console.log(req.params)
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      console.log(err)
      res.sendStatus(403)
    } else {
      console.log('Fetching user with id: ' + req.params.id)
      // SELECT name from SERVICE WHERE service_id = ?;

      const userID = req.params.id
      const queryString = 'SELECT service_order.order_id, customer.*, service.*, service_order.service_id, service_order.customer_id, service_order.scheduled from service_order JOIN service on service_order.service_id JOIN customer on service_order.customer_id  WHERE employee_id = ?'
      db.query(queryString, [userID], (err, rows, fields) => {
        if (err) {
          console.log('Failed to query for service_orders: ' + err)
          res.sendStatus(500)
          res.end()
          return
        }
        console.log('I think we fetched it')
        console.log(rows)
        res.json(rows)
      })
    }
  })
})

module.exports = router
