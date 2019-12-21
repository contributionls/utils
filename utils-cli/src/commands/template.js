const {Command, flags} = require('@oclif/command')
const {template} = require('..')
class TemplateCommand extends Command {
  async run() {
    const {flags} = this.parse(TemplateCommand)
    const url = flags.url
    const source = flags.source
    const templateStr = flags.template
    const finalUrl = template(url, templateStr, source)
    this.log(`${finalUrl}`)
  }
}

TemplateCommand.description = `Template config url type
...
Extra documentation goes here
https://utils.men/
`

TemplateCommand.flags = {
  url: flags.string({char: 'u', required: true, description: 'need to convert url'}),
  template: flags.string({char: 't', required: true, description: 'specific the template'}),
  source: flags.string({char: 's', options: ['ini', 'yaml', 'json'], description: 'optional, specific the urls source file type, if not specific, it will auto detect the url\'s file type, value could be \'ini\', \'yaml\', \'json\''}),
}

module.exports = TemplateCommand
