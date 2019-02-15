var express = require('express');
var router = express.Router();
// var mysql = require('mysql')
var generator = require('generate-password')
var db = require('../db/db');

// TODO: 
// CRUD

// Get all employee
router.get("/", (req, res) => {
	const queryString = "SELECT * FROM employee"
	db.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log("Failed to query for employees: " + err)
			res.sendStatus(500)
			res.end()
			return
		}

		console.log("I think we fetched it")
		res.json(rows)
		return
	})
})

// Get Employee by id
router.get("/:id", (req, res) => {
	console.log("Fetching user with id: " + req.params.id)

	const userID = req.params.id
	const queryString = "SELECT * FROM employee WHERE employee_id = ?"
	db.query(queryString, [userID], (err, rows, fields) => {

		if (err) {
			console.log("Failed to query for users: " + err)
			res.sendStatus(500)
			res.end()
			return
		}

		console.log("I think we fetched it")
		console.log(rows[0]);
		res.json(rows[0])
		return
	})

	// res.end()
})

// Create Employee
router.post('/create', (req, res) => {
	console.log("Trying to create a new user")

	const first_name = req.body.first_name
	const last_name = req.body.last_name
	const address = req.body.address
	const zip_code = req.body.zip_code
	const phone_number = req.body.phone_number.replace(/-/g, "")
	const email = req.body.email

	const user_name = (first_name[0] + last_name).toLowerCase()
	const password = generator.generate({
		length: 10,
		numbers: true
	});

	const queryString = "INSERT INTO employee (first_name, last_name, user_name, password, address, zip, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

	db.query(queryString, [first_name, last_name, user_name, password, address, zip_code, phone_number, email], (err, results, field) => {
		if (err) {
			console.log("Failed to insert new user: " + err)
			res.sendStatus(500)
		}

		console.log("Inserted a new user with id: ", results.insertId)
		res.end()
		return
	})

	res.end();
	return
})

// Delete Employee information
router.delete("/:employee_id", (req, res) => {
	const queryString = "DELETE FROM employee WHERE employee_id = ?"
	const employee_id = req.params.employee_id
	db.query(queryString, [employee_id], (err, rows, fields) => {
		if (err) {
			console.log("Failed to query for employees: " + err)
			res.sendStatus(500)
			res.end()
			return
		}
		console.log("Employee is deleted")
	})
	res.sendStatus(200)
	return
});

// Edit Employee information
router.post("/edit/:employee_id", (req, res) => {
	const first_name = req.body.first_name
	const last_name = req.body.last_name
	const address = req.body.address
	const zip = req.body.zip
	const phone = parseInt(req.body.phone, 10)
	const email = req.body.email
	const employee_id = req.body.employee_id

	const queryString = "UPDATE employee SET employee_id = ?, first_name = ?, last_name = ?, address = ?, zip = ?, phone = ?, email = ? WHERE employee_id = ?"
	console.log(queryString);
	db.query(queryString, [employee_id, first_name, last_name, address, zip, phone, email, employee_id], (err, rows, fields) => {
		if (err) {
			console.log("Failed to query for employees: " + err)
			res.sendStatus(500)
			res.end()
			return
		}
		console.log("Employee is updated")
	})
	res.sendStatus(200)
	return
});

module.exports = router