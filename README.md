# Merge Online

## About <a name = "about"></a>

Merge your yaml or json config from url online.

## Getting Started <a name = "getting_started"></a>

1. You can visit this site to generate and preview a final url online(TODO): <https://merge.utils.men>
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://merge.utils.men/merge?urls[]={url}&urls[]={url2}&urls[]={url3}
```

> You can merge many numbers of urls,the merge strategy is made from the library [deepmerge](https://www.npmjs.com/package/deepmerge)

**example:**

For yaml or yml:

<http://merge.utils.men/merge?urls%5B%5D=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml&urls[]=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.yaml>

For json:

<http://merge.utils.men/merge?urls%5B%5D=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json&urls[]=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.json>

You can also specific the file type:

<http://merge.utils.men/merge?urls%5B%5D=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json&urls[]=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.json&type=json>

## Contribute

### develop

```bash
yarn dev
```

### product

```bash
yarn start
```

### test

```bash
yarn test
```
