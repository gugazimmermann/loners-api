# Loners App API

API endpoinds and database handler for the Loners App. 

This API should handle all the requests using NodeJS, Hapi and MongoDB.

### Technologies Used

NodeJS, Hapi, Swagger, MongoDB, Mongoose, Mongo-Express and Docker.

### How To Install

* clone the project with `git clone https://github.com/gugazimmermann/loners-api.git`
* go to the project folder `cd loners-api`
* make sure you have installed **docker** and **docker-compose**
* create a `.env` file in the root of `loners-api` folder with the content:
```
MONGO_USERNAME=YOUR-MONGO-USERNAME-CHANGE-IT
MONGO_PASSWORD=YOUR-MONGO-PASSWORD-CHANGE-IT
MONGO_PORT=27017
MONGO_DB=YOUR-MONGO-DATABASE-CHANGE-IT
```

### How To Run

* run `docker-compose up`

### How To Use

API Endpoint: http://localhost:8080

API Documentation: http://localhost:8080/documentation

MONGO EXPRESS: http://localhost:8081 - use the same username and password you defined in the `.env` file.

## API ENDPOINTS

See API Documentation