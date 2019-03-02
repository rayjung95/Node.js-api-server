var express = require('express')
var router = express.Router()

/**
 * @param  {} '/'
 * @param  {} function(req
 * @param  {} res
 * @param  {} next
 */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome to Unplug And Thrive API' })
})

module.exports = router
