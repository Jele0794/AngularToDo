#!/usr/bin/env node
'use strict';

// module dependencies
const app = require('../index');
const debug = require('debug')('express:server');
const http = require('http');

// create http server
const httpPort = normalizePort(process.env.PORT || 8080);
app.set('port', httpPort);
const httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on('error', onError);

// start listening on port
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param {string|number} val Port value.
 * @return {string|number} Return the string or integer port.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 * @param {Error} error Error.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof httpPort === 'string'
    ? 'Pipe ' + error.port
    : 'Port ' + error.port;

  // handle specific listen errors with friendly messages.
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    case 'ELIFECYCLE':
      console.info('Server killed by user.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
  let addr = httpServer.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
