FROM node:22-alpine3.19 

USER node

WORKDIR /home/node/code


COPY --chown=node:node package-lock.json package.json ./
RUN npm ci

COPY --chown=node:node . .


CMD ["node", "server.js"]
