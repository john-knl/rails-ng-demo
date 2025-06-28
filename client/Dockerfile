FROM node:20-alpine as build

WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN ng build

FROM nginx:1-alpine

COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200 80

CMD ["nginx", "-g", "daemon off;"]