var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')

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
            const user = {
                "employee_id": rows[0].employee_id,
                "first_name": rows[0].first_name,
                "last_name": rows[0].last_name,
            }
            //Getting Token
            jwt.sign({ user }, 'secretkey', (err, token) => {
                res.json({
                    "success": "You have successfully logged in",
                    token
                })
                console.log("Here")
                res.end();
                return
            });

        } else {
            res.status(403).json({ "error": "Cannot log in" })
            res.end();
            return

        }

    })
})

module.exports = router