FROM node:latest
COPY ./container-server/express-demo /var/www
WORKDIR /var/www
RUN npm install nodemon
RUN npm install
ENTRYPOINT npm start
EXPOSE 3000


# FROM node:latest (create image based on node latest version)
# COPY ./express-demo /var/www (copy my files from local/to container)
# WORKDIR /var/www (directory that my RUN command will run)
# RUN npm install nodemon (execute npm install nodemon inside WORKDIR/container)
# RUN npm install (execute npm install inside WORKDIR/container)
# ENTRYPOINT npm start (execute npm start when my container is ready)
# EXPOSE 3000 (port that my container will run)


##### 1 - BUILD MY dockfile
# docker build -f dockerfile -t gabriel/servernode . 
#PS: the point (.) is the path where is the dockerfile
#PS: -f dockerfile is my docker file name
#PS: -t gabriel/servernode is my image tag

##### 2 - CREATE CONTAINER BASED ON DOCKERFILE CREATED
# docker run -d -p 8080:3000 gabriel/servernode


#### 3 - Send created image to docker hub
# docker login 
# docker push gabriel/servernode 


#### 4 - download created image from docker hub
# docker pull gabriel/servernode 


##### CREATE NETWORK
# docker network create --driver bridge my-network (create custom network)
# docker network ls

# docker run -it --name my-container-ubuntu --network my-network ubuntu (append my container in my network)
# docker inpect my-container-ubuntu (to make sure the container created is in the same network)

# apt update (in the ubuntu, run apt update)
# apt install iputils-ping (in the ubuntu, run apt update to install command ping)



#### CREATE BD MONGO
# docker run -d  --name my-mongo --network my-network mongo