FROM node:18

RUN mkdir /app
WORKDIR /app

RUN chown -R node:node /usr/local/lib/node_modules \
    && chown -R node:node /usr/local/bin \
    && chown -R node:node /app

USER node:node

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]