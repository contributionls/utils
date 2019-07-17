# Convert Online

## About <a name = "about"></a>

Convert your yaml,json,ini config from url online,and give you a new config url.

## Getting Started <a name = "getting_started"></a>

1. You can visit this site to generate and preview a final url online: <https://convert.utils.men>
1. You can also build the final url by yourself,here is the url pattern:

```bash
https://api.utils.men/convert?url=${encodeURIComponent(url)}
```

**example:**

For yaml to json:

<https://api.utils.men/convert?source=yaml&dest=json&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.yaml>

For ini to yaml:

<https://api.utils.men/convert?source=ini&dest=yaml&url=https%3A%2F%2Fgist.githubusercontent.com%2Fcontributionls%2F6ab023e9d4c1e17fc3dc13220812ca6f%2Fraw%2Fa.ini>
