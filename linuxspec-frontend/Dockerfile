FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL=https://api.linuxspec.com
ARG NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/linuxspec/intro-call
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
