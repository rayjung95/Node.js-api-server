const express = require('express')
const router = express.Router()
var db = require('../db/db')

// TODO:
// CRUD done

// Get all service orders
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM service_order'
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for serviceOrder: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    res.status(200).json(rows)
  })
})

// Get a serviceOrder by service_order_id
router.get('/:order_id', (req, res) => {
  console.log('Fetching serviceOrder with order_id: ' + req.params.order_id)
  const orderId = req.params.order_id
  const queryString = 'SELECT * FROM service_order WHERE order_id = ?'
  db.query(queryString, [orderId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for serviceOrder: ' + err)
      res.status(500).end()
      return
    }
    console.log('Succeed to query for serviceOrder')
    res.status(200).json(rows[0])
  })
})

// Create a serviceOrder
router.post('/create', (req, res) => {
  const customerId = req.body.customer_id
  const serviceId = req.body.service_id
  const employeeId = req.body.employee_id
  const scheduled = req.body.scheduled
  const description = req.body.description
  const status = req.body.status

  const queryString = 'INSERT INTO service_order (customer_id, service_id, employee_id, scheduled, description, status) VALUES (?, ?, ?, ?, ?, ?)'
  db.query(queryString, [customerId, serviceId, employeeId, scheduled, description, status], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new serviceOrder: ' + err)
      res.status(500).end()
      return
    }
    console.log('Inserted a new user with serviceOrder: ', results)
    res.status(200).json({ status: 200 })
  })
})

// Delete serviceOrder entity
router.delete('/:order_id/delete', (req, res) => {
  const queryString = 'DELETE FROM service_order WHERE order_id = ?'
  const orderId = req.params.order_id
  db.query(queryString, [orderId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for serviceOrder: ' + err)
      res.status(500).json(err)
      return
    }
    console.log('serviceOrder is deleted')
    res.status(200).json({ status: 200 })
  })
})

// Edit ServiceOrder information
router.post('/:order_id/edit', (req, res) => {
  const orderId = req.params.order_id
  const customerId = req.body.customer_id
  const serviceId = req.body.service_id
  const employeeId = req.body.employee_id
  const scheduled = req.body.scheduled
  const description = req.body.description
  const status = req.body.status
  console.log(description)

  const queryString = 'UPDATE service_order SET customer_id = ?, service_id = ?, employee_id = ?, scheduled = ?, description = ?, status = ? WHERE order_id = ? AND customer_id = ? AND service_id  = ? '
  console.log(queryString)
  db.query(queryString, [customerId, serviceId, employeeId, scheduled, description, status, orderId, customerId, serviceId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for service: ' + err)
      res.status(500).json(err)
      res.end()
      return
    }
    console.log('ServiceOrder is updated')
    res.status(200).json({ status: 200 })
  })
})

// Get list of service orders that assigned to an employee
router.get('/:employee_id', (req, res) => {
  console.log('Fetching service with employee_id: ' + req.params.employee_id)

  const employeeId = req.params.employee_id
  const queryString = 'SELECT * FROM service_order WHERE employee_id = ?'
  db.query(queryString, [employeeId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for customers: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }

    // if (rows.length != 1) {
    //   res.json({error: "User with ID: " + userID + " not found."})
    //   res.end()
    // }

    console.log('I think we fetched it')
    res.status(200).json(rows)
  })
})

module.exports = router
