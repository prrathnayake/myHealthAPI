FROM node:16.15.1-alpine

WORKDIR /usr/src/my-health-api

COPY . .

RUN apt-get update
RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN pip install -r ./requirements.txt
RUN npm install

EXPOSE 3001 

CMD ["npm", "start"]