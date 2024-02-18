# Step 1: Build the Next.js application
# Use an official Node.js as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# # Copy package.json and package-lock.json to work directory
# COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm ci


# Build the Next.js application
RUN npm run build

# Step 2: Run the Next.js application
FROM node:18-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Copy the built app and the .next folder from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
