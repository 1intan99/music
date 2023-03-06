FROM node:16-alpine AS builder

## di pake buat build doang and copy hasil build

WORKDIR /app

COPY . .

RUN npm install -g typescript

RUN npm run build; exit 0
RUN rm -rf ./src

FROM node:16-alpine AS final

WORKDIR /app

# uncomment bawah ini kalo pake canvas
RUN apk update \
    && apk add --no-cache build-base g++ cairo-dev jpeg-dev pango-dev giflib-dev python3 ca-certificates \
    && apk add --update  --repository http://dl-3.alpinelinux.org/alpine/edge/testing libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation fontconfig 

COPY --from=builder /app/ ./

RUN npm install

CMD [ "node", "." ]