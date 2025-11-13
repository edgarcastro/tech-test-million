FROM --platform=linux/arm64 node:20-alpine
WORKDIR /app
COPY package*.json .
COPY yarn.lock .
RUN yarn install

COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]