FROM ubuntu:16.04

RUN apt-get update && apt-get install -y libgnome-keyring-dev nodejs npm curl

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install n -g && n stable

RUN npm install

EXPOSE 8080

CMD ./gotty -w --title-format "Scores-CLI Online" bash