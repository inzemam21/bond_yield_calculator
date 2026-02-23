# Stage 1: Build frontend
FROM node:20-alpine AS builder-client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build backend
FROM node:20-alpine AS builder-server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ ./
RUN npm run build

# Stage 3: Production environment
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copy backend dependencies
COPY --from=builder-server /app/server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --omit=dev

# Copy backend build
COPY --from=builder-server /app/server/dist ./dist

# Copy frontend build so the backend can serve it statically
# We will configure NestJS to serve from this relative path
COPY --from=builder-client /app/client/dist ./client/dist

# Expose port (local reference, Railway injects PORT)
EXPOSE 3000

# Start NestJS application
CMD ["node", "dist/main.js"]
