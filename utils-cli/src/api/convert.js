const queryString = require('query-string')
const {API_HOST} = require('../config')
const getConvertUrl = (url, dest, source) => {
  const searchObj = {}
  if (source) {
    searchObj.source = source
  }
  if (dest) {
    searchObj.dest = dest
  }
  searchObj.url = url
  const query = queryString.stringify(searchObj)
  return `${API_HOST}/convert?${query.toString()}`
}

module.exports = getConvertUrl
