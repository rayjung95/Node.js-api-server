<<<<<<< Updated upstream
var express = require('express');
var router = express.Router();

// function getConnection() {
//   return pool
// }

/* GET home page. */
=======
var express = require('express')
var router = express.Router()
/**
 * @param  {} '/'
 * @param  {} function(req
 * @param  {} res
 * @param  {} next
 */
>>>>>>> Stashed changes
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  return
});


module.exports = router;
