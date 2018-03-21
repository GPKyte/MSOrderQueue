# MSOrderQueue  
System that works as a queue to process 3D-print requests for a MakerSpace  

## Installation  
1. Clone repository  
2. Install [Node.js v8.10](https://nodejs.org/en/)  
3. Install [JDK v1.8.0_161](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)  
4. Install [Gradle v4.6+](https://gradle.org/install/)  
5. Optionally Install [MongoDB Community Edition v3.6.3](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)  

## Usage 
All instructions assume initial start at root of repository.  
 
Back-End API  
1. `cd server/`  
2. To run unit tests `gradle test`  
3. To start API `gradle bootRun`  
4. To GET data, go to http://localhost:8080/api while running server  
5. Alternatively use curl and see [printer schema](https://docs.google.com/document/d/15hHME8CRUwTjUELbfcHTXjU25vftQ_49fHTaqbWTC3s/edit#bookmark=id.tg3cquwfoicw) for format  
  Supported (but not fully tested) http commands are GET, POST, PUT, PATCH, DELETE  
  e.g. `curl -X POST localhost:8080/api/printers -d "{\"name\": \"Tiny\", \"brand\": \"MakerBot\", \"model\": \"Z18\", \"status\": \"READY\"}" -H "Content-Type:application/json"`

Front-End Server  
1. `cd front-end`  
2. `npm update`  
3. `npm start`  

## Contribution  
Contact @GPKyte for info.  
Requirements and Specifications listed [here](https://docs.google.com/document/d/1fb7CLjBCswqYBPAZyXDil4iPDmx3oRyt0yeMMOYkGgE/edit?usp=sharing)  
Design and Implementation listed [here](https://docs.google.com/document/d/15hHME8CRUwTjUELbfcHTXjU25vftQ_49fHTaqbWTC3s/edit?usp=sharing)
