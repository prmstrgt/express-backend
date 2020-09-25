module.exports = {
  users: (search) => {
    if (typeof search === 'object') {
      const searchKey = Object.keys(search)[0]
      const searchValue = Object.values(search)[0]
      return { searchKey, searchValue }
    } else {
      const searchKey = 'email'
      const searchValue = search || ''
      return { searchKey, searchValue }
    }
  }
}
