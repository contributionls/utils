const {Command, flags} = require('@oclif/command')
const {convert} = require('..')
class ConvertCommand extends Command {
  async run() {
    const {flags} = this.parse(ConvertCommand)
    const url = flags.url
    const source = flags.source
    const dest = flags.dest
    const finalUrl = convert(url, dest, source)
    this.log(`${finalUrl}`)
  }
}

ConvertCommand.description = `Convert config url type
...
Extra documentation goes here
https://utils.men/
`

ConvertCommand.flags = {
  url: flags.string({char: 'u', required: true, description: 'need to convert url'}),
  dest: flags.string({char: 'd', required: true, options: ['ini', 'yaml', 'json'], description: 'specific the url dest file type, value could be \'ini\', \'yaml\', \'json\''}),
  source: flags.string({char: 's', options: ['ini', 'yaml', 'json'], description: 'optional, specific the urls source file type, if not specific, it will auto detect the url\'s file type, value could be \'ini\', \'yaml\', \'json\''}),
}

module.exports = ConvertCommand
