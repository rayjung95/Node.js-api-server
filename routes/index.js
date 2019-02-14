var express = require('express');
var router = express.Router();

// function getConnection() {
//   return pool
// }

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  return
});


module.exports = router;
