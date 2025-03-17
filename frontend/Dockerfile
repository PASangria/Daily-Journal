# Build Stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Production Stage
FROM node:18-alpine

# Install a lightweight HTTP server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy only the built app from the previous stage
COPY --from=build /app/dist ./dist

# Use a non-root user for better security
RUN adduser -D appuser
USER appuser

# Expose port 5173 (default Vite preview port)
EXPOSE 5173

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "5173"]
