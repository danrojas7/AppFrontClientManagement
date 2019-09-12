FROM node:lts-alpine as build-stage

RUN apk update && apk add vim && apk add curl && \
    apk add bash

WORKDIR /opt/app/build

COPY package*.json /opt/app/build/

RUN npm install

COPY ./ /opt/app/build/

RUN npm run build-prod
RUN npm run gen-war


FROM tomcat:8.5.5-jre8

RUN apt-get update && apt-get install vim

RUN cp /usr/share/zoneinfo/America/Bogota /etc/localtime && echo "America/Bogota" > /etc/timezone

COPY conf/tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml
COPY conf/context.xml /usr/local/tomcat/webapps/manager/META-INF/context.xml

COPY --from=build-stage /opt/app/build/*.war /usr/local/tomcat/webapps/

EXPOSE 8080

WORKDIR /usr/local/tomcat

