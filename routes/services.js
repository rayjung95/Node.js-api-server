var express = require('express')
var router = express.Router()
var db = require('../db/db')

// TODO
// CRUD done

// Get all services
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM service'
  db.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for services: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    res.json(rows)
  })
})

// Get a service by service id
router.get('/:id', (req, res) => {
  console.log('Fetching user with id: ' + req.params.id)

  const userID = req.params.id
  const queryString = 'SELECT * FROM service WHERE service_id = ?'
  db.query(queryString, [userID], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for customers: ' + err)
      res.status(500).end()
      return
    }
    console.log('I think we fetched it')
    res.status(200).json(rows[0])
  })
})

// Create a service
router.post('/create', (req, res) => {
  const name = req.body.name
  const provider = req.body.provider
  const description = req.body.description
  const manualLink = req.body.manual_link

  const queryString = 'INSERT INTO service (name, provider, description, manual_link) VALUES (?, ?, ?, ?)'
  db.query(queryString, [name, provider, description, manualLink], (err, results, field) => {
    if (err) {
      console.log('Failed to insert new service: ' + err)
      res.status(500).end()
      return
    }
    console.log('Inserted a new user with service: ', results.insertId)
    res.status(200).json({ status: 200 })
  })
})

// Delete service entity
router.delete('/:service_id/delete', (req, res) => {
  const queryString = 'DELETE FROM service WHERE service_id = ?'
  const serviceId = req.params.service_id
  db.query(queryString, [serviceId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for service: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log('service is deleted')
    res.status(200).json({ status: 200 })
  })
})

// Edit Service information
router.post('/:service_id/edit', (req, res) => {
  const serviceId = req.params.service_id
  const name = req.body.name
  const provider = req.body.provider
  const description = req.body.description
  const manualLink = req.body.manual_link

  const queryString = 'UPDATE service SET name = ?, provider = ?, description = ?, manual_link = ? WHERE service_id = ?'
  console.log(queryString)
  db.query(queryString, [name, provider, description, manualLink, serviceId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for service: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }
    console.log('Service is updated')
    res.status(200).json({ status: 200 })
  })
})

module.exports = router
