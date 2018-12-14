# Project Install
--------------------
[![CircleCI](https://circleci.com/gh/dpineda64/data-table.svg?style=svg)](https://circleci.com/gh/dpineda64/data-table)
[![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge&root=projects.html)](https://data-table-app.herokuapp.com/)

Setup
======
### Requirements
* Node v8.12 or higher
* A csv file called data at project root
* .env at project root

### Client
```js
yarn install | npm install // install dependencies
yarn serve   | npm run serve // PORT 8081
```

### Api
```js
// after installing the dependencies, in a new terminal
yarn start | node start // start server in port 9040
```

Test
====
### unit
```js
yarn test:unit
```