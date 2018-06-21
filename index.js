'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'vanilla-todo.log'),
    {flags: 'a'});

// setup the logger.
app.use(logger('combined', {
    stream: accessLogStream,
}));
// setup statics.
app.use('/assets', serveStatic('assets'));
// setup bodyparser.
app.use(bodyParser.json());
// setup pug engine.
app.set('view engine', 'pug');

// routes.
app.use(require('./controllers'));

module.exports = app;
