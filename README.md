This is a repo that created for SWE-573 course of Software Engineering Master Program in Bogazici University.

In this project we aim to develop a web application which will enable users to meet with communities and providing them offers in return of credits.

![](https://github.com/SabriKorkmaz/project-x/blob/main/code/app/src/assets/logo/Project-x-logos.jpeg?raw=true)

Project-x consists of 2 parts as backend and frontend applications. The Flask library is used for the backend part and the React library is used for the frontend part. The application works and is stored as two separate parts. So to use the App we need to download each image from DockerHub.

First, we run our frontend application.

The following line of code can be used to download and install our frontend application from DockerHub.

docker pull sbrkrkmz/project-x:project-x-frontend
<br>
docker run -dp 8080:80 --name project-x-ui sbrkrkmz/project-x:project-x-frontend

After this process, our frontend application is now working, but without our backend application, it does not provide any functionality.

Second, we run our backend application.

Since the backend application is a bit more complex than the frontend in terms of complexity, docker-compose was used in this part. You can use the link below to download docker-compose.

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

After downloading the docker-compose file in the link below and going to the folder it is in, we run our backend application with a single piece of command line code.


Docker-compose file link : 
https://github.com/SabriKorkmaz/project-x/blob/main/code/api/docker-compose.yml

docker-compose up -d

After completing all these steps, we can access our application with http://localhost:8080


