const express = require('express')
const app = express()
const setUpApp = require('./setup')
const setUpRoutes = require('./routes')

setUpApp(app)
setUpRoutes(app)

module.exports = app
