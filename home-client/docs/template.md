# Template url Online

## About

Use your yaml,json,ini config from url,render your template,and give you a new jsonpath config url.

## Getting Started

1. You can visit this site to generate and preview a final url online: <https://template.utils.men>
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://api.utils.men/template?url=${encodeURIComponent(url)}&template=${encodeURIComponent(template)}
```

**example:**

### For yaml

```sh
https://api.utils.men/template?source=yaml&template=%24%7B%24.foo.bar%7D&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml
```

### For json

```sh
https://api.utils.men/template?source=json&template=%24%7B%24.foo.bar%7D&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.json
```

### template example

```sh
${$.foo.bar}
```

```sh
${JSON.stringify($.foo)}
```
