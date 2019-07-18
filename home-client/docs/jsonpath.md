# Jsonpath url Online

## About

Convert your yaml,json,ini config from url online,and give you a new jsonpath config url.

## Getting Started

1. You can visit this site to generate and preview a final url online: <https://jsonpath.utils.men>
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://api.utils.men/jsonpath?url=${encodeURIComponent(url)}&jsonpath=${encodeURIComponent(jsonpath)}
```

**example:**

For yaml:

```sh
https://api.utils.men/jsonpath?source=json&jsonpath=%24.foo&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml
```

For json

```sh
https://api.utils.men/jsonpath?source=json&jsonpath=%24.foo&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json
```
