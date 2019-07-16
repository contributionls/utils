.PHONY: build start test deploy stop-deploy build-start local-deploy stop-local-deploy merge server home

SERVER_NAME   := contributionls/utils-server
MERGE_CLIENT_NAME   := contributionls/utils-merge-client
HOME_CLIENT_NAME   := contributionls/utils-home-client

TAG    := $$(git log -1 --pretty=%H)
SERVER_IMG    := ${SERVER_NAME}:${TAG}
SERVER_LATEST := ${SERVER_NAME}:latest
MERGE_CLIENT_IMG    := ${MERGE_CLIENT_NAME}:${TAG}
MERGE_CLIENT_LATEST := ${MERGE_CLIENT_NAME}:latest
HOME_CLIENT_IMG    := ${HOME_CLIENT_NAME}:${TAG}
HOME_CLIENT_LATEST := ${HOME_CLIENT_NAME}:latest
build:
	cd server && docker build -t ${SERVER_LATEST} . && cd ../merge-client && docker build -t ${MERGE_CLIENT_LATEST} . && cd ../home-client && docker build -t ${HOME_CLIENT_LATEST} .
start:
	docker-compose up
build-start:
	docker-compose up --build
stop:
	docker-compose stop
test:
	docker-compose -f ./docker-compose.test.yml up --build
local-deploy:
	docker-compose -f ./docker-compose.local.deploy.yml up -d
stop-local-deploy:
	docker-compose -f ./docker-compose.local.deploy.yml stop
deploy:
	docker-compose -f ./docker-compose.deploy.yml up -d
stop-deploy:
	docker-compose -f ./docker-compose.deploy.yml stop
merge:
	docker-compose exec merge-client /bin/sh
server:
	docker-compose exec server /bin/sh
home:
	docker-compose exec home-client /bin/sh
logs:
	docker-compose logs -f