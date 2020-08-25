#!/usr/bin/env node
const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use(require("./app/routes"))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`The center service is 🏃🏃🏃 on 🚪:${PORT}`))