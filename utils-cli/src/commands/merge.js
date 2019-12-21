const {Command, flags} = require('@oclif/command')
const {merge} = require('..')
class MergeCommand extends Command {
  async run() {
    const {flags} = this.parse(MergeCommand)
    const allUrls = flags.url
    const source = flags.source
    const url = merge(allUrls, source)
    this.log(`${url}`)
  }
}

MergeCommand.description = `Merge config url
...
Extra documentation goes here
https://utils.men/
`

MergeCommand.flags = {
  url: flags.string({char: 'u', required: true, description: 'need to merge url, you can pass this flag multiple', multiple: true}),
  source: flags.string({char: 's', options: ['ini', 'yaml', 'json'], description: 'optional, specific the urls source file type, if not specific, it will auto detect the url\'s file type, value could be \'ini\', \'yaml\', \'json\''}),
}

module.exports = MergeCommand
