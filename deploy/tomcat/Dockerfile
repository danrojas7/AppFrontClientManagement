FROM node:10.16.3-alpine as build-stage

RUN apk update && apk add bash curl vim

WORKDIR /opt/app/build

COPY package*.json ./ 

RUN npm install

COPY . . 

RUN npm run build && npm run grunt


FROM tomcat:8.5.5-jre8

#RUN apt-get update && apt-get install vim

WORKDIR /usr/local/tomcat

RUN mkdir -p ./conf/Catalina/localhost/

COPY conf/server.xml ./conf/server.xml
COPY conf/rewrite.config ./conf/Catalina/localhost/rewrite.config
COPY conf/tomcat-users.xml ./conf/tomcat-users.xml
COPY conf/context.xml ./webapps/manager/META-INF/context.xml

COPY --from=build-stage /opt/app/build/*.war ./webapps/

EXPOSE 8080

