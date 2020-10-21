# get the base node image
FROM node:alpine 

# set the working dir for container
WORKDIR /rick-and-morty-react

# copy the json file first
COPY ./package.json .

# install npm dependencies
RUN npm install

# copy other project files
COPY . /rick-and-morty-react/

EXPOSE 3200
# build the folder
CMD [ "npm", "start" ]

# # Use a lighter version of Node as a parent image
# FROM mhart/alpine-node:8.11.4
# # Set the working directory to /client
# WORKDIR /rick-and-morty-react
# # copy package.json into the container at /client
# COPY package*.json /rick-and-morty-react/
# # install dependencies
# COPY . .
# RUN npm --verbose install
# # Copy the current directory contents into the container at /client
# COPY . /rick-and-morty-react/
# # Make port 3000 available to the world outside this container
# EXPOSE 3000
# # Run the app when the container launches
# CMD ["npm", "start"]