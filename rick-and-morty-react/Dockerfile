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

