const {Command, flags} = require('@oclif/command')
const {jsonpath} = require('..')
class JsonpathCommand extends Command {
  async run() {
    const {flags} = this.parse(JsonpathCommand)
    const url = flags.url
    const source = flags.source
    const jsonpathStr = flags.jsonpath
    const finalUrl = jsonpath(url, jsonpathStr, source)
    this.log(`${finalUrl}`)
  }
}

JsonpathCommand.description = `Jsonpath config url type
...
Extra documentation goes here
https://utils.men/
`

JsonpathCommand.flags = {
  url: flags.string({char: 'u', required: true, description: 'need to convert url'}),
  jsonpath: flags.string({char: 'j', required: true, description: 'specific the jsonpath'}),
  source: flags.string({char: 's', options: ['ini', 'yaml', 'json'], description: 'optional, specific the urls source file type, if not specific, it will auto detect the url\'s file type, value could be \'ini\', \'yaml\', \'json\''}),
}

module.exports = JsonpathCommand
