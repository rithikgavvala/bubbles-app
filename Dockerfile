# Build container
FROM node:12-alpine AS build

WORKDIR /usr/src/bubbles-app/
COPY . /usr/src/bubbles-app/

RUN yarn install && yarn build

# Runtime container
FROM node:12-alpine

COPY --from=build /usr/src/bubbles-app/server/ /usr/src/bubbles-app/server/
COPY --from=build /usr/src/bubbles-app/client/ /usr/src/bubbles-app/client/

WORKDIR /usr/src/bubbles-app/server/

EXPOSE 3000
CMD ["yarn", "start"]
