# Stage 1: Build Stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only 
RUN npm install 

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
CMD ["node", "dist/app.js"]
