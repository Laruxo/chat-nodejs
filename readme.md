# NodeJS Chat Example
## Using Ajax

For learning purposes only.

It is intended to start from "start" branch. Use master branch only for reference.

For best overview it is recommended to complete example in "ajax" branch first, then "websockets" branch and finally go to master.

### Requirements

* Latest Docker version
* Knowledge about JavaScript and Ajax

### Starting examples

```bash
 docker-compose up -d
```

In your browser use ports 8000 to try different apps:
* [http://localhost:8000/](http://localhost:8000/)


### Test and Lint

```bash
 docker-compose run --rm node npm -s test
 docker-compose run --rm node npm -s run lint
```
