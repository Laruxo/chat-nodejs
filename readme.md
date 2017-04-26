# NodeJS Chat Example
## Using ExpressJS

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

In your browser use ports 8000 to try the app:
* [http://localhost:8000/](http://localhost:8000/)


### Test and Lint

```bash
 docker-compose run --rm node npm -s test
 docker-compose run --rm node npm -s run lint
```

### Improvement ideas

Docker:
* Use separate container for websockets server (better scalability).

WebSockets:
* Display online users
* Indicate that somebody is typing

NodeJS:
* Use [PostgreSQL](http://expressjs.com/en/guide/database-integration.html#postgres) or 
[MongoDB](http://expressjs.com/en/guide/database-integration.html#mongo) for storing messages.
* Use [sessions](https://github.com/expressjs/session) for identifying users.
* Add private messaging
