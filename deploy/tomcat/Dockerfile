FROM node:lts-alpine as build-stage

RUN apk update && apk add vim && apk add curl && \
    apk add bash

RUN npm install -g npm:latest && npm install -g @angular/cli@8.0.1 && npm install -g grunt@1.0.4 && \
    npm install -g grunt-cli@1.3.2 && npm install -g grunt-war@0.5.1

WORKDIR /opt/app/build

COPY package*.json /opt/app/build/

RUN npm install

COPY ./ /opt/app/build/

RUN ng build --prod --baseHref=/AppFrontClientManagement/ --deployUrl=/AppFrontClientManagement/
RUN grunt war


FROM tomcat:8.5.5-jre8

COPY conf/tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml
COPY conf/context.xml /usr/local/tomcat/webapps/manager/META-INF/context.xml

COPY --from=build-stage /opt/app/build/AppFrontClientManagement.war /usr/local/tomcat/webapps/

EXPOSE 8080

WORKDIR /usr/local/tomcat

