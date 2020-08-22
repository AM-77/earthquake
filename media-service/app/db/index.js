const sqlite3 = require("sqlite3")

const connect = (db_name) => {
  return new sqlite3.Database(db_name, (err) => {
    if (err) throw new Error("DB ERROR: connect ", err.message)
  })
}

const createTable = (db) => {
  db.run("CREATE TABLE earth_db (info TEXT)", (err) => {
    if (err) throw new Error("DB ERROR: createTable ", err.message)
  })

  return true
}

const emptyTable = (db) => {
  db.run("DELETE FROM earth_db", (err) => {
    if (err) throw new Error("DB ERROR: emptyTable ", err.message)
  })

  return true
}

const close = (db) => {
  return db.close((err) => { if (err) throw new Error("DB ERROR: close ", err.message) })
}

const insertInfo = (db, info) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO earth_db VALUES (?)", info, function(err, rows) {
      if (err) reject(new Error("DB ERROR: select ", err.message))
      resolve(true)
    })
  })
}

const selectInfos = (db) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM earth_db`, function(err, rows) {
      if (err) reject(new Error("DB ERROR: select ", err.message))
      resolve(rows)
    })
  })
}


module.exports = { connect, close, createTable, emptyTable, insertInfo, selectInfos }