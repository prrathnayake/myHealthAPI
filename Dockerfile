FROM node:17

WORKDIR /usr/src/my-health-api

COPY . .

RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN pip install -r ./requirements.txt
RUN npm install

EXPOSE 3001 

CMD [ "pm2-runtime", "npm", "--", "start" ]