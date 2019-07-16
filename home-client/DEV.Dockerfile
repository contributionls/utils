FROM node:lts-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 5000
CMD ["yarn","start"]