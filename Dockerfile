FROM node:16.17.0
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --system app
COPY ./ .
RUN npm install
# RUN npm install --save pm2
RUN chown -R app /opt/app
USER app
EXPOSE 3000
# CMD [ "npm", "run", "pm2" ]
CMD [ "npm", "run", "start" ]
