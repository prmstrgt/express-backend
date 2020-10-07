const table = 'products_ratings'
const model = require('../helpers/model')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  }
}
