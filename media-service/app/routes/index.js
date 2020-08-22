const express = require("express")
const infosRouter = express.Router()
const infosController = require("../controllers")

infosRouter.get('/infos', infosController.getInfos)

module.exports = infosRouter