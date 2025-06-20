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
CMD ["npm run start:dev"]


FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy app dependencies and install them
COPY package.json ./
COPY --chown=node:node prisma ./prisma/
RUN npm install --frozen-lockfile
RUN npx prisma generate
# Copy the rest of your app
COPY . .

# Expose the port
EXPOSE 3000

# Run the app with Nest CLI
CMD ["npm run start:dev"]
# CMD ["nest", "start", "--watch"]

