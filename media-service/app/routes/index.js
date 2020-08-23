const express = require("express")
const infosRouter = express.Router()
const infosController = require("../controllers")

infosRouter.get('/infos', infosController.getInfos)
infosRouter.get('/clear', infosController.emptyInfos)

module.exports = infosRouter