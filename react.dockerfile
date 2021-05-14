# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

### SATGE 1
# Name the node stage "builder"
FROM node:latest AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./container-client .
# install node modules and build assets
RUN npm install && npm run build -l 9000

### SATGE 2
# nginx state for serving content
FROM nginx
#
#COPY nginx.conf /etc/nginx/nginx.conf
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY ./container-client/nginx.conf /etc/nginx/nginx.conf
#
EXPOSE 9000
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

