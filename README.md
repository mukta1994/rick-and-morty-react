# rick-and-morty-react

docker build . -t rickmorty

#see images. rickmortyimage image will get created
docker image ls


#run image
docker run -it -p 3000:3000 rickmorty