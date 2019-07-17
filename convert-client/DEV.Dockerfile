FROM node:lts-alpine
WORKDIR /app
ENV REACT_APP_API_HOST http://localhost:4000
ENV REACT_APP_MAIN_HOST http://localhost:8080
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 3001
CMD ["/bin/sh","-c","PORT=3001 yarn start"]