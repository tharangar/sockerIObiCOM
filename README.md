# sockerIObiCOM
socket io based   bi directional communicator
This README is just a fast *quick start* document.

What is sockerIObiCOM?
--------------

This is socker.io based docker container monitoring and controlling tool. Further it has following featues.

* Monitoring containers.
* START and STOP containers.
* view status and up time.

Following solutions are used in this solution.


* Node js
* React
* TypeScript
* Webpack
* Socket.io


Building applicaiton
--------------------

This project is a good start to learn about node and react with socker.io.

Following url are the refference for this project and you may use bellow source for further clarifications.

https://dzone.com/articles/create-a-docker-dashboard-with-typescript-react-an
https://github.com/elkdanger/docker-dashboard-example

Further completed project can be cloned from bellow url:https://github.com/tharangar/sockerIObiCOM.git

    % git clone https://github.com/tharangar/sockerIObiCOM.git

then change to the directory and use following commands to up the project:

    % cd docker-dahsbord-example

# Docker Dashboard Example

This is the code repository for the "Create a Docker dashboard with Typescript, React and Socket.io" article on Auth0.

## Prerequisites

**Node 6.x**

**Webpack 2**

```
npm install -g webpack
```

**Typescript 2.x**

```
npm install -g typescript
```

Clone the project, then run:

```
npm install
npm link typescript
```

The sample interacts with Docker, so having the [native Docker tools](https://www.docker.com/) for your OS is required for the sample to be of any use. If you're looking for an image to play around with for the sample, feel free to use `elkdanger/express-app`:

`docker pull elkdanger/express-app`

## Running the sample

```
npm start
```

