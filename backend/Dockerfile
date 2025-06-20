# Stage 1: Install deps
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm install --frozen-lockfile

# Stage 2: Copy source
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose port and run
EXPOSE 3000
CMD ["npm", "start:dev"]
