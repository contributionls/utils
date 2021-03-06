# Convert Online

## About

Convert your yaml,json,ini config from url online,and give you a new config url.

## Getting Started

1. You can visit this site to generate and preview a final url online: <https://convert.utils.men>
1. You can use the [npm package](https://www.npmjs.com/package/@contributionls/utils-cli) to generate the final url: `npx @contributionls/utils-cli convert -u url -d json -s yaml`
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://api.utils.men/convert?url=${encodeURIComponent(url)}
```

**example:**

For yaml to json:

```sh
https://api.utils.men/convert?source=yaml&dest=json&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml
```

For ini to yaml:

```sh
https://api.utils.men/convert?source=ini&dest=yaml&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.ini
```
