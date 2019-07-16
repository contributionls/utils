# Stage 1
FROM node:10.15.3-alpine as react-build
WORKDIR /app
ENV REACT_APP_API_HOST https://api.utils.men
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000
COPY ./ ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
RUN rm -rf /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]