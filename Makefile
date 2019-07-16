.PHONY: start build stop test deploy merge server home logs

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
start:
	docker-compose -f ./docker-compose.development.yml up
start-with-build:
	docker-compose -f ./docker-compose.development.yml up --build
build:
	docker build -t ${SERVER_LATEST} server && docker build -t ${MERGE_CLIENT_LATEST} merge-client && docker build -t ${HOME_CLIENT_LATEST} home-client
stop:
	docker-compose stop
test:
	docker-compose -f ./docker-compose.test.yml up --build
deploy:
	docker-compose up -d
merge:
	docker-compose exec merge-client /bin/sh
server:
	docker-compose exec server /bin/sh
home:
	docker-compose exec home-client /bin/sh
logs:
	docker-compose logs -f