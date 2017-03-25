# NodeJS Chat examples

For learning purposes only.

It is intended to start from ajax example and work up to express app.

### Requirements

* Latest Docker version
* Knowledge about JavaScript and Ajax

### Starting examples

```bash
 docker-compose up -d
 # or start a single example:
 docker-compose up ajax # or 'websockets' or 'express'
```

In your browser use ports 8001-8003 to try different apps:
* [chat-ajax](http://localhost:8001/)
* [chat-websockets](http://localhost:8002/)
* [chat-express](http://localhost:8003/)


### Test and Lint

Only express app has tests and linting.

```bash
 docker-compose run --rm express npm -s test
 docker-compose run --rm express npm -s run lint
```

### Improvement ideas

Docker:
* Modify websockets and express examples to use the same websocket (message sharing between different apps).
* Use separate container for websockets server (better scalability).

WebSockets:
* Display online users
* Indicate that somebody is typing

NodeJS:
* Use [PostgreSQL](http://expressjs.com/en/guide/database-integration.html#postgres) or 
[MongoDB](http://expressjs.com/en/guide/database-integration.html#mongo) for storing messages.
* Use [sessions](https://github.com/expressjs/session) for identifying users.
* Add private messaging
