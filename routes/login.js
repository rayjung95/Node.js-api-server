var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/", (req, res, next) => {
    const employee_id = req.body.employee_id
    const password = req.body.password

    console.log(req.body)

    const queryString = "SELECT * FROM employee WHERE employee_id = ? AND password = ?"
    db.query(queryString, [employee_id, password], (err, rows, fields) => {
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