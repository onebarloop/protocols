FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies needed for build)
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default command (will be overridden by docker-compose)
CMD ["npm", "start"]