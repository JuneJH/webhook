FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
EXPOSE 8089


CMD [ "pm2-runtime", "start", "pm2.json" ]

