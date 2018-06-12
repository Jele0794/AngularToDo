# Vanilla ToDo

Another ToDo app developed with vanilla JS for the front-end and node for the back-end. The objective of this app is to practice my javascript skills.

The app will let you create, update, view and delete tasks. Also you can mark as done the tasks. 
Another functionality that is intended to exist is to identify tasks by labels, letting you filter by those.

## Functionalities

1. Tasks CRUD.
2. Labels.
3. Due dates by tasks.
4. Filter by labels and by due date.

## Front End

The front-end will be developed using vanilla JS and trying to use the minimum possible libraries. Also, [*Sass*](https://sass-lang.com/) will be used for the styles and [*Pug*](https://pugjs.org) as the HTML template engine.

## Back End

The back-end of this project will use REST services to be reused on future projects (Angular, React, Mobile). It will be developed also using vanilla JS, Express and MariaDB. For the development process we will use Gulp for the dev tasks; Mocha.js for unit testing; WebPack for dist files.

## Database

The database schemas will be on xml files that will be used by liquibase.

## Development to Deployment.

The development process will use [*Travis CI*](https://travis-ci.org/) for continious integration; [*Git Flow*](https://nvie.com/posts/a-successful-git-branching-model/) as the work flow; [*Github*](https://github.com/) as the remote repository; [*Heroku*](https://heroku.com/) for deployment.
