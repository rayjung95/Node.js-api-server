var express = require('express')
var router = express.Router()
var db = require('../db/db')

// UWU
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM customer'
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for customers: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    res.json(rows)
  })
})

router.get('/:id', (req, res) => {
  console.log('Fetching user with id: ' + req.params.id)

  const userID = req.params.id
  const queryString = 'SELECT * FROM customer WHERE customer_id = ?'
  db.query(queryString, [userID], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for customers: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log('I think we fetched it')
    res.json(rows)
  })
})

router.post('/create', (req, res) => {
  const firstName = req.body.first_name
  const lastName = req.body.last_name
  const address = req.body.address
  const zipCode = req.body.zip_code
  const phoneNumber = req.body.phone_number.replace(/-/g, '')
  const email = req.body.email
  const queryString = 'INSERT INTO customer (first_name, last_name, address, zip, phone, email) VALUES (?, ?, ?, ?, ?, ?)'

  db.query(queryString, [firstName, lastName, address, zipCode, phoneNumber, email], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new user: ' + err)
      res.sendStatus(500)
    }

    console.log('Inserted a new user with id: ', results.insertId)
    res.end()
  })

  res.end()
})

module.exports = router
