# rick-and-morty-react


#This project is built using react js.

#Prerequisite: System should have Node js version 10.13 or higher version.
#Download the project from git hub.

#Once download is complete, please go to "rick-and-morty-react" folder in command prompt and then type and run the below command
npm install
npm start

#If compiled successful, then the project should run on http://localhost:3000/.




#Dockrize:
#Dockerfile is created in project root folder.

#build image using command
docker build . -t rickmorty

#see images using below command. rickmorty image will get created
docker image ls

#run image rickmorty and project will run on http://localhost:3000/
docker run -it -p 3000:3000 rickmorty
