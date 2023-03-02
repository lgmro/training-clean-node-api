const express = require('express')
const app = express()
const setUpApp = require('./setup')

setUpApp(app)

module.exports = app
