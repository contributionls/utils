const queryString = require('query-string')
const {API_HOST} = require('../config')
const getTemplateUrl = (url, template, source) => {
  const searchObj = {}

  if (source) {
    searchObj.source = source
  }

  if (template) {
    searchObj.template = template
  }
  searchObj.url = url
  const query = queryString.stringify(searchObj)
  return `${API_HOST}/template?${query.toString()}`
}

module.exports = getTemplateUrl
