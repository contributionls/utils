# Merge Online

## About

Merge your yaml,json,ini config from url online,and give you a new config url.

## Getting Started

1. You can visit this site to generate and preview a final url online: <https://merge.utils.men>
1. You can use the [npm package](https://www.npmjs.com/package/@contributionls/utils-cli) to generate the final url: `npx @contributionls/utils-cli merge -u url1 -u url2`
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://api.utils.men/merge?urls=${encodeURIComponent(url1,url2,url3)}
```

> You can merge many numbers of urls,the merge strategy is made from the library [deepmerge](https://www.npmjs.com/package/deepmerge)

**example:**

For yaml or yml:

```bash
https://api.utils.men/merge?urls=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml%2Chttps%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.yaml
```

For json:

```bash
https://api.utils.men/merge?urls=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json%2Chttps%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.json
```

For ini:

```bash
https://api.utils.men/merge?urls=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.ini%2Chttps%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.ini
```

You can also specific the file type:

```sh
https://api.utils.men/merge?type=json&urls=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json%2Chttps%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fb.json
```

```

```
