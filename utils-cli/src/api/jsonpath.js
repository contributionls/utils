const queryString = require('query-string')
const {API_HOST} = require('../config')
const getJsonpathUrl = (url, jsonpath, source) => {
  const searchObj = {}
  if (source) {
    searchObj.source = source
  }
  if (jsonpath) {
    searchObj.jsonpath = jsonpath
  }
  searchObj.url = url
  const query = queryString.stringify(searchObj)
  return `${API_HOST}/jsonpath?${query.toString()}`
}

module.exports = getJsonpathUrl
