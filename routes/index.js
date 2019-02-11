var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "a01026675-test-db.cf9zyau6meiw.us-west-2.rds.amazonaws.com",
  user: "node",
  password: "password",
  database: "unplug_and_thrive"
})

function getConnection() {
  return pool
}

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const queryString = "SELECT * FROM employee WHERE email = '?' AND password = '?"
  var successJSON
  var user

  getConnection().query(queryString, [email, password], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      res.end()
      return
    }

    if (rows.length == 0) {
      res.send({ status: "error" })
    }

    user = rows[0];
    successJSON = { status: "success", account: rows[0] };
  })
  jwt.sign({user}, 'secret', (err, token) => {
    res.json({
      token,
    })

  })
  // res.json(successJSON)
});

module.exports = router;
