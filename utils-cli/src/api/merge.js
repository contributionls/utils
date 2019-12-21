const queryString = require('query-string')
const {API_HOST} = require('../config')
const getMergedUrl = (allUrls, source) => {
  const searchObj = {}
  if (source) {
    searchObj.source = source
  }
  searchObj.urls = allUrls.filter(url => {
    return url
  })
  const query = queryString.stringify(searchObj)
  return `${API_HOST}/merge?${query}`
}

module.exports = getMergedUrl

