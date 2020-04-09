FROM alpine:3.8
RUN mkdir /pandemonium
WORKDIR /pandemonium
COPY package.json .
RUN apk update && apk upgrade
RUN apk add nodejs npm
RUN npm install
EXPOSE 8080
COPY . /pandemonium
CMD ["node", "app"] 

