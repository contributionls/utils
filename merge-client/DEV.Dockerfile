FROM node:10.15.3-alpine
WORKDIR /app
ENV REACT_APP_API_HOST http://localhost:4000
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ ./
EXPOSE 3000
CMD ["yarn","start"]