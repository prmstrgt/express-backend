const db = require('../helpers/db')
const table = 'items'

module.exports = {
  createItemModel: (arr, cb) => {
    const query = `INSERT INTO ${table} (name, price, description) VALUES ('${arr[0]}',${arr[1]},'${arr[2]}')`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  getItemModel: (arr, cb) => {
    const query = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' LIMIT ${arr[2]} OFFSET ${arr[3]}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  searchItemModel: (arr, cb) => {
    const query = `SELECT COUNT(*) AS count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    db.query(query, (_err, data, _field) => {
      cb(data)
    })
  },
  getSortModel: (arr, cb) => {
    const query = `SELECT * FROM ${table} ORDER BY ${arr[0]} ${arr[1]} LIMIT ${arr[2]} OFFSET ${arr[3]}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  sortCountModel: (arr, cb) => {
    const query = `SELECT COUNT(*) AS count FROM ${table} ORDER BY ${arr[0]} ${arr[1]} LIMIT ${arr[2]} OFFSET ${arr[3]}`
    db.query(query, (_err, data, _field) => {
      cb(data)
    })
  },
  getDetailModel: (id, cb) => {
    const query = `SELECT * FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  updateItemModel: (arr, cb) => {
    const query = `UPDATE ${table} SET name = '${arr[0]}', price = ${arr[1]}, description = '${arr[2]}' WHERE id = ${arr[3]}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePartialModel: (arr, cb) => {
    const query = `UPDATE ${table} SET ${arr[0]} WHERE id = ${arr[1]}`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    const query = `DELETE FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  }
}
