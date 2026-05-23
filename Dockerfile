FROM node:20

RUN apt update && apt install -y python3 ffmpeg curl

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp

RUN chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
