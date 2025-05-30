FROM node:20-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    python3 \
    make

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json yarn.lock ./

# Fix SSL issues
RUN yarn config set "strict-ssl" false

# Install dependencies
RUN yarn global add node-gyp && \
    yarn config set network-timeout 600000 -g && \
    yarn install

ENV PATH=/opt/node_modules/.bin:$PATH

# Move to app directory and copy source
WORKDIR /opt/app
COPY . .

# Set permissions and switch to non-root user
RUN chown -R node:node /opt/app
USER node

# Rebuild esbuild binary for Alpine *after* full app is copied

RUN yarn config set "strict-ssl" false && \
    yarn add --dev esbuild && \
    yarn esbuild --version


# Build the app
RUN yarn build

EXPOSE 1337

CMD ["yarn", "develop"]
