###GDP test

This project structure was made specific for this test.

###set-up

dependencias:
- docker 
- docker-compose

build the docker container with compose:
```
docker-compose build
```

run server:
```
docker-compose up
```

run tests:
```
docker-compose run server npm run test
```

###usage

You can take a look at the swagger documentation at `http://localhost:3000/docs` also 
I've made a simple ui to consume the api `http://localhost:3000/`;

Example call to api:

```
curl 
    -X POST 
    --header 'Content-Type: application/json' 
    --header 'Accept: application/json' 
    -d '{ "customer": "Unilever", "items": [ "classic", "classic", "classic" ] }'
    'http://localhost:3000/api/checkout'
```
