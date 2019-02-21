
var mysql = require('mysql')
var config = require('./config.json')
var db

function connectDatabase () {
  if (!db) {
    db = mysql.createPool({
      connectionLimit: config.connectionLimit,
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    })

    if (db) {
      console.log('Database is connected!')
    } else {
      console.log('Error connecting database!')
    }
  }
  return db
}

module.exports = connectDatabase()
