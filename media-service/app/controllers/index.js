const { connect, close, emptyTable, insertInfo, selectInfos } =  require("../db")

const getInfos = async (req, res, next) => {
  const db = connect('infos_bd')
  const infos = await selectInfos(db)
  close(db)
  res.json({ code: 200, infos })
}

const emptyInfos = async (req, res, next) => {
  const db = connect('infos_bd')
  emptyTable(db)
  close(db)
  res.json({ code: 200 })
}

const saveInfo = async (info) => {
  const db = connect('infos_bd')
  let res
  const inserted = await insertInfo(db, info)
  inserted ? res = true : res = false
  close(db)
  return res
}

module.exports = { getInfos, emptyInfos, saveInfo }