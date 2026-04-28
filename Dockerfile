# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# ← ADD THESE LINES to pass env vars at build time
ARG VITE_API_BASE_URL
ARG VITE_APP_NAME
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


# Production stage
FROM node:22-alpine

WORKDIR /app


RUN npm install -g serve


COPY --from=builder /app/dist ./dist



EXPOSE 9021


CMD ["serve", "-s", "dist", "-l", "9021"]
