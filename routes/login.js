var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.post("/", (req, res, next) => {
    const employee_id = req.body.employee_id
    const password = req.body.password

    console.log(req.body)

    const queryString = "SELECT * FROM employee WHERE employee_id = ? AND password = ?"
    getConnection().query(queryString, [employee_id, password], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for employee: " + err)
            res.sendStatus(500)
            res.end()
            return
        }

        if (rows.length > 0) {
            res.json({ "success": "You have successfully logged in" });
            res.end();
            return
        }

        res.status(500).json({ "error": "Cannot log in" })
        res.end();
        return

    })
})

module.exports = router