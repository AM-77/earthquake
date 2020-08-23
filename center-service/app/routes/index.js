const express = require("express")
const infosRouter = express.Router()
const infosController = require("../controllers")

infosRouter.post('/infos', infosController.sendInfos)

module.exports = infosRouter