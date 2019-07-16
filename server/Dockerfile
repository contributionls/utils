FROM node:lts-alpine
RUN yarn global add pm2
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 4000
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]