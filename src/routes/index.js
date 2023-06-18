const express = require('express');
const { authenticate } = require('../auth');
const { createSuccessResponse } = require('../response');

const { version, author } = require('../../package.json');

const router = express.Router();

router.use(`/v1`, authenticate(), require('./api'));

router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response
  res.status(200).json(
    createSuccessResponse({
      status: 'ok',
      author,
      // Use your own GitHub URL for this...
      githubUrl: 'https://github.com/dimcot8/fragments',
      version,
    })
  );

  // If you would like to respond with an error, you can use the createErrorResponse function like so:
  // res.status(code).json(createErrorResponse(code, message));
});

module.exports = router;
