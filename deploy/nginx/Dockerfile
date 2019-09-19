FROM node:10.16.3-alpine as build-stage

RUN apk update && apk add vim && apk add curl && \
    apk add bash

WORKDIR /opt/app/build

COPY package*.json /opt/app/build/

RUN npm install

COPY ./ /opt/app/build/

RUN npm run build


FROM nginx:1.17.3-alpine

RUN apk update && apk add vim && apk add curl && \
    apk add bash && apk add tzdata

ENV TZ=America/Bogota
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build-stage /opt/app/build/dist /usr/share/nginx/html
COPY --from=build-stage /nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
