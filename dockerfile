FROM node:22

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    librsvg2-dev \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libgtk-3-0 \
    libxss1 \
    libxshmfence1 \
    libxext6 \
    libxfixes3 \
    libnss3-tools \
    fonts-liberation \
    xdg-utils \
    wget \
    unzip \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_CHROMIUM_REVISION=1263111
ENV CHROMIUM_DOWNLOAD_URL=https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/${PUPPETEER_CHROMIUM_REVISION}/chrome-linux.zip

RUN mkdir -p /usr/src/chromium && \
    cd /usr/src/chromium && \
    wget -q $CHROMIUM_DOWNLOAD_URL -O chrome-linux.zip && \
    unzip chrome-linux.zip && \
    rm chrome-linux.zip && \
    mv chrome-linux /usr/src/chromium/chromium && \
    ln -s /usr/src/chromium/chromium/chrome /usr/bin/chromium-browser

WORKDIR /app

RUN yarn add typescript
RUN yarn add ts-node
RUN yarn add https-proxy-agent

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
