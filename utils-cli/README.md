@contributionls/utils-cli
=========================

For utils client, the npm package can instead of <https://utils.men>

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@contributionls/utils-cli.svg)](https://npmjs.org/package/@contributionls/utils-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@contributionls/utils-cli.svg)](https://npmjs.org/package/@contributionls/utils-cli)
[![License](https://img.shields.io/npm/l/@contributionls/utils-cli.svg)](https://github.com/contributionls/utils/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Api](#api)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @contributionls/utils-cli
$ utils-cli COMMAND
running command...
$ utils-cli (-v|--version|version)
@contributionls/utils-cli/0.0.1 darwin-x64 node-v10.17.0
$ utils-cli --help [COMMAND]
USAGE
  $ utils-cli COMMAND
...
```
<!-- usagestop -->

# Api
<!-- api -->

```javascript
const {merge, template, jsonpath, convert} = require('@contributionls/utils-cli')
const url1 = merge(['https://google.com','https://hp.com'])
console.log('url1',url)
```

## merge

`merge(urls,sourceFileType)`

* `sourceFileType`, optional, specific the urls source file type, if not specific, it will auto detect the url's file type, value could be `ini`, `yaml`, `json`

## template

`template(url,template,sourceFileType)`

* `sousourceFileTyperce`, optional, specific the urls source file type, if not specific, it will auto detect the url's file type, value could be `ini`, `yaml`, `json`

## convert

`convert(url,destFileType,sourceFileType)`

## jsonpath

`jsonpath(url,jsonpath,sourceFileType)`

* `sourceFileType`, optional, specific the urls source file type, if not specific, it will auto detect the url's file type, value could be `ini`, `yaml`, `json`

<!-- apistop -->

# Commands
<!-- commands -->
* [`utils-cli convert`](#utils-cli-convert)
* [`utils-cli hello`](#utils-cli-hello)
* [`utils-cli help [COMMAND]`](#utils-cli-help-command)
* [`utils-cli jsonpath`](#utils-cli-jsonpath)
* [`utils-cli merge`](#utils-cli-merge)
* [`utils-cli template`](#utils-cli-template)

## `utils-cli convert`

Convert config url type

```
USAGE
  $ utils-cli convert

OPTIONS
  -d, --dest=ini|yaml|json    (required) specific the url dest file type, value could be 'ini', 'yaml', 'json'

  -s, --source=ini|yaml|json  optional, specific the urls source file type, if not specific, it will auto detect the
                              url's file type, value could be 'ini', 'yaml', 'json'

  -u, --url=url               (required) need to convert url

DESCRIPTION
  ...
  Extra documentation goes here
  https://utils.men/
```

_See code: [src/commands/convert.js](https://github.com/contributionls/utils/blob/v0.0.1/src/commands/convert.js)_

## `utils-cli hello`

Describe the command here

```
USAGE
  $ utils-cli hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/contributionls/utils/blob/v0.0.1/src/commands/hello.js)_

## `utils-cli help [COMMAND]`

display help for utils-cli

```
USAGE
  $ utils-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `utils-cli jsonpath`

Jsonpath config url type

```
USAGE
  $ utils-cli jsonpath

OPTIONS
  -j, --jsonpath=jsonpath     (required) specific the jsonpath

  -s, --source=ini|yaml|json  optional, specific the urls source file type, if not specific, it will auto detect the
                              url's file type, value could be 'ini', 'yaml', 'json'

  -u, --url=url               (required) need to convert url

DESCRIPTION
  ...
  Extra documentation goes here
  https://utils.men/
```

_See code: [src/commands/jsonpath.js](https://github.com/contributionls/utils/blob/v0.0.1/src/commands/jsonpath.js)_

## `utils-cli merge`

Merge config url

```
USAGE
  $ utils-cli merge

OPTIONS
  -s, --source=ini|yaml|json  optional, specific the urls source file type, if not specific, it will auto detect the
                              url's file type, value could be 'ini', 'yaml', 'json'

  -u, --url=url               (required) need to merge url, you can pass this flag multiple

DESCRIPTION
  ...
  Extra documentation goes here
  https://utils.men/
```

_See code: [src/commands/merge.js](https://github.com/contributionls/utils/blob/v0.0.1/src/commands/merge.js)_

## `utils-cli template`

Template config url type

```
USAGE
  $ utils-cli template

OPTIONS
  -s, --source=ini|yaml|json  optional, specific the urls source file type, if not specific, it will auto detect the
                              url's file type, value could be 'ini', 'yaml', 'json'

  -t, --template=template     (required) specific the template

  -u, --url=url               (required) need to convert url

DESCRIPTION
  ...
  Extra documentation goes here
  https://utils.men/
```

_See code: [src/commands/template.js](https://github.com/contributionls/utils/blob/v0.0.1/src/commands/template.js)_
<!-- commandsstop -->
