var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require("cors")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require('dotenv').config()

var indexRouter = require("./routes/index")
var stocksRouter = require("./routes/stock")

var app = express()

app.use(cors())
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )

mongoose.set('useUnifiedTopology', true)
mongoose
  .connect(
    process.env.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


var Users = require('./routes/Users')

app.use('/users', Users) 
app.use("/", indexRouter)
app.use("/api/stocks", stocksRouter)

module.exports = app