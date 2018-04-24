# MSOrderQueue  [![Build Status](https://travis-ci.org/GPKyte/MSOrderQueue.svg?branch=master)](https://travis-ci.org/GPKyte/MSOrderQueue) [![codecov](https://codecov.io/gh/GPKyte/MSOrderQueue/branch/master/graph/badge.svg)](https://codecov.io/gh/GPKyte/MSOrderQueue)
System that works as a queue to process 3D-print requests for a MakerSpace  

## Installation  
1. Clone repository  
2. Install [Node.js v8.10](https://nodejs.org/en/)  
3. Install [JDK v1.8.0_161](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)  
4. Install [Gradle v4.6+](https://gradle.org/install/)  
5. Optionally Install [MongoDB Community Edition v3.6.3](https://docs.mongodb.com/manual/installation/#mongodb-community-edition) to run your own db instance

## Usage  
### Starting the project
All instructions assume initial start at root of repository.  

Back-End API  
1. `cd server/`  
2. To run unit tests `gradle test`  
3. To start API `gradle bootRun`  
4. To GET data, go to http://localhost:8080/api while running server  
5. Alternatively use curl  
  Supported http commands are GET, POST, PUT, PATCH, DELETE  
  e.g. `curl -v -X POST localhost:8080/api/requests -d '{"user": "kyteg", "comments": "Test Request", "forClass": "true", "requestItems": [{"fileName": "nerd.stl", "qty": 1337}]}' -H "Content-Type: application/json"`  

To form JSON body for API Requests see [schema](schema.md)

Front-End Server  
Note: This relies on the back-end server for database connection  
1. `cd front-end/`  
2. `npm update`  
3. `npm install`
4. `npm start`  
5. To look at the webpage that is run, go to localhost:3000, or follow the instructions on your command prompt.  

### Modifications for Production or Otherwise
#### To connect different MongoDB instances:  
Modify lines of application.properties file that match `spring.data.mongodb.*`  
For production, edit the [Main application.properties](server/src/main/resources/application.properties) file  
For development, create a non-production db to connect to and edit the [test application.properties](server/src/test/resources/application.properties) file  

Note: Both are configured to our use case, please be courteous and change both.  

## Contribution  
Contact @GPKyte for info.  
Requirements and Specifications listed [here](https://docs.google.com/document/d/1fb7CLjBCswqYBPAZyXDil4iPDmx3oRyt0yeMMOYkGgE/edit?usp=sharing)  
Design and Implementation listed [here](https://docs.google.com/document/d/15hHME8CRUwTjUELbfcHTXjU25vftQ_49fHTaqbWTC3s/edit?usp=sharing)  

For those generous enough to do testing or fix bugs please open a pull request or new issue.  
