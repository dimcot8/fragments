require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const authenticate = require('./auth');
const { createSuccessResponse, createErrorResponse } = require('./response'); // Import the functions

// version and author from our package.json file
const { version, author } = require('../package.json');
//console.log({ env: process.env });
const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Use logging middleware
app.use(pino);

// Use security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Use gzip/deflate compression middleware
app.use(compression());
passport.use(authenticate.strategy());
app.use(passport.initialize());

// Define a simple health check route. If the server is running
// we'll respond with a 200 OK.  If not, the server isn't healthy.
app.get('/', (req, res) => {
  // Clients shouldn't cache this response (always request it fresh)
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#controlling_caching
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response with info about our repo
  res.status(200).json(
    createSuccessResponse({
      author,
      githubUrl: 'https://github.com/dimcot8/fragments',
      version,
    })
  );
});
app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json(createErrorResponse(404, 'not found'));
});

app.use((err, req, res) => {
  // We may already have an error response we can use, but if not, use a generic
  // 500 server error and message.
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  // If this is a server error, log something so we can see what's going on.
  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json(createErrorResponse(status, message));
});

// Export our `app` so we can access it in server.js
module.exports = app;
