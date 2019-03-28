var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')
var fs = require('fs')

var indexRouter = require('./routes/index')
var employeesRouter = require('./routes/employees')
var customersRouter = require('./routes/customers')
var servicesRouter = require('./routes/services')
var serviceOrderRouter = require('./routes/serviceOrder')
var loginRouter = require('./routes/login')

var app = express()

var server = require('http').createServer(app)

server.listen(10000, function (err) {
  if (err) {
    console.log(err)
  }
  console.log('listening on port 10000')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type,  Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,  POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/', indexRouter)
app.use('/employees', employeesRouter)
app.use('/customers', customersRouter)
app.use('/services', servicesRouter)
app.use('/serviceOrder', serviceOrderRouter)
app.use('/login', loginRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
