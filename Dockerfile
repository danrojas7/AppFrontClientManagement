FROM node:10.16.3-alpine as build-stage

RUN apk update && apk add vim && apk add curl && \
    apk add bash

WORKDIR /opt/app/build

COPY package*.json /opt/app/build/

RUN npm install

COPY ./ /opt/app/build/

RUN npm run build
RUN npm run grunt


FROM tomcat:8.5.5-jre8

#RUN apt-get update && apt-get install vim

RUN mkdir -p ~/conf/Catalina/localhost/

COPY conf/server.xml /usr/local/tomcat/conf/server.xml
COPY conf/rewrite.config ~/conf/Catalina/localhost/rewrite.config
COPY conf/tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml
COPY conf/context.xml /usr/local/tomcat/webapps/manager/META-INF/context.xml

COPY --from=build-stage /opt/app/build/*.war /usr/local/tomcat/webapps/

EXPOSE 8080

WORKDIR /usr/local/tomcat

