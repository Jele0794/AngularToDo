'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'vanilla-todo.log'),
    {flags: 'a'});

// setup the logger.
app.use(logger('combined', {
    stream: accessLogStream,
}));
// setup bodyparser.
app.use(bodyParser.json());
// setup cors.
app.use(cors({origin: 'http//localhost:4200', optionsSuccessStatus: 200}));
// setup angular dist.
app.use('/', serveStatic('frontend/dist/frontend', {index: 'index.html'}));

// routes.
app.use(require('./controllers'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    // res.send('ok');
    // res.sendFile('frontend/dist/frontend/index.html');
    res.sendFile(path.join(__dirname, 'frontend/dist/frontend/index.html'));
});

module.exports = app;
