const table = 'products'
const tableColor = 'products_colors'
const tablePict = 'products_images'
const tableCond = 'conditions'
const tableCat = 'categories'
const tableRating = 'products_ratings'
const tableStore = 'stores'
const model = require('../helpers/model')

const column = `${table}.id, ${table}.seller_id, ${table}.name, ${table}.price, ${table}.description, ${tableCond}.name AS product_condition, ${tableCat}.name AS category, ${tableStore}.name AS store, ${tableColor}.name AS color, ${tableColor}.hexcode AS hex, ${tablePict}.image, ${tableColor}.quantity, ${table}.created_at, ${table}.updated_at`
const join = `INNER JOIN conditions ON conditions.id=products.condition_id INNER JOIN categories ON categories.id=products.category_id INNER JOIN products_colors ON products_colors.product_id=products.id INNER JOIN products_images ON products_images.color_id=products_colors.id INNER JOIN stores ON stores.user_id=products.seller_id`

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  createColorModel: (data = {}) => {
    const query = `INSERT INTO ${tableColor} SET ?`
    const results = model(query, data)
    return results
  },
  createPictModel: (data = []) => {
    const query = `INSERT INTO ${tablePict} SET ?`
    const results = model(query, data)
    return results
  },
  countModel: (arr) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT ${column}, (SELECT AVG(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS rating, (SELECT COUNT(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS ratingCount FROM ${table} ${join} WHERE products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = {}) => {
    const query = `SELECT ${column}, (SELECT AVG(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS rating, (SELECT COUNT(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS ratingCount FROM ${table} ${join} WHERE ${table}.id=?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  updateColorModel: (data = []) => {
    const query = `UPDATE ${tableColor} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  updatePictModel: (data = []) => {
    const query = `UPDATE ${tablePict} SET ? WHERE color_id=?`
    const results = model(query, data)
    return results
  },
  deleteModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    const results = model(query, data)
    return results
  },
  countSellerModel: (arr, data = {}) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE products.seller_id=? AND products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query, data)
    return results
  },
  getSellerModel: (arr, data = []) => {
    const query = `SELECT ${column}, (SELECT AVG(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS rating FROM ${table} ${join} WHERE products.seller_id=? AND products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailSellerModel: (data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE seller_id=? ${table}.id=?`
    const results = model(query, data)
    return results
  }
}
