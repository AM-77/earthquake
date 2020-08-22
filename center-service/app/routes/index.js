const express = require("express")
const infosRouter = express.Router()
const infosController = require("../controllers")

infosRouter.post('/info', infosController.sendInfos)

module.exports = infosRouter