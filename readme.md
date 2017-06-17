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