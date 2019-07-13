FROM node:10.15.3-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ /app/
EXPOSE 4000
CMD ["yarn","dev"]