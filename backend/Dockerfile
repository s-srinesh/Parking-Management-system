# Multi-stage or lightweight Node.js runtime for backend
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files for dependency caching
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose port (Internal only - NOT published to the internet)
EXPOSE 5000

# Start backend server
CMD ["node", "index.js"]
