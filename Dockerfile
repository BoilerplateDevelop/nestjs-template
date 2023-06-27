FROM node:lts-alpine3.15 AS development

# install base requirements
RUN apk update && apk add yarn bash git openssh

# install node-prune to remove unnecessary file in node_module (https://github.com/tj/node-prune)
RUN npm install -g node-prune

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

FROM node:lts-alpine3.15 AS production

WORKDIR '/usr/src/app'

# copy from build image
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE 3030

CMD [ "node", "./dist/main" ]

# =====================================================
