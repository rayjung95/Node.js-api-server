var express = require('express')
var router = express.Router()

// function getConnection() {
//   return pool
// }

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to Unplug And Thrive API' })
})

module.exports = router
