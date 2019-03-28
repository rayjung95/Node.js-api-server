var express = require('express')
var router = express.Router()
var db = require('../db/db')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')
require('dotenv/config')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/', (req, res, next) => {
  if (!(req.headers.api_key === process.env.API_KEY)) {
    res.sendStatus(403)
    return
  }

  const employeeId = req.body.employee_id
  const password = req.body.password

  const queryString = 'SELECT * FROM employee WHERE employee_id = ? AND password = ?'
  db.query(queryString, [employeeId, password], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for employee: ' + err)
      res.sendStatus(500)
      res.end()
      return
    }

    if (rows.length > 0) {
      const user = {
        'employee_id': rows[0].employee_id,
        'first_name': rows[0].first_name,
        'last_name': rows[0].last_name
      }
      // Getting Token
      jwt.sign({ user }, 'secretkey', (err, token) => {
        if (err) {
          res.json({ err })
        }
        res.json({
          'success': 'You have successfully logged in',
          token
        })
        console.log('Here')
        res.end()
      })
    } else {
      res.status(403).json({ 'error': 'Cannot log in' })
      res.end()
    }
  })
})

router.post('/sendEmail', (req, res) => {
  console.log(req.body)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_ADDR,
      pass: process.env.GMAIL_PASS
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'fakeunplugandthrive@gmail.com', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: `${req.body.subject}`, // Subject line
    html: req.body.html// html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
  })

  res.status(200).json({ status: 200 })
})

module.exports = router
