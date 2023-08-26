const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
const auth = require('./routes/auth_routes')
const device = require('./routes/device_routes')

// these are the base urls for services
app.use("/api/auth",auth)
app.use("/api/devices",device)
module.exports = app