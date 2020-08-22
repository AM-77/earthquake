#!/usr/bin/env node
const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use(require("./app/routes"))

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`The app is 🏃🏃🏃 on 🚪:${PORT}`))
