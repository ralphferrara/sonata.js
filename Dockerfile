# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Install build tools and dependencies for sharp
RUN apt-get update && apt-get install -y \
  python3 \
  g++ \
  make \
  ffmpeg \
  libvips-dev

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy only the TypeScript files and compile them
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 80
EXPOSE 80

# Keep the container running
CMD ["sh", "-c", "while :; do sleep 2073600; done"]
