# Contributing

For unite enviroment,we use docker for development and deploy.

## Prerequisites

You should install [docker](https://www.docker.com/) in your client.

## Dev

Just run:

```bash
make start
# if you want stop it,just ctrl+c
# or
make stop
```

If you want install new package, you should enter the container:

```bash
make merge
```

Then,it'll watch the file's changes,and auto restart or refresh

The home client dev url is <http://localhost:8080>
The merge client dev url is <http://localhost:3000>
The conver client dev url is <http://localhost:3001>
The server dev url is <http://localhost:4000>

## 🔧 Running the tests <a name = "tests"></a>

```bash
make test
```

## And coding style

We use [prettier](https://prettier.io/) default rule,you should install [vscode prettier format tools](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) fro development.

## Deploy

deploy:

```bash
make deploy
```

stop deploy:

```bash
make stop
```

The server url is <https://api.utils.men>
The merge client url is <https://merge.utils.men>
The home client url is <https://utils.men>
