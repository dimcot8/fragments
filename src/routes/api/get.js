const { createSuccessResponse, createErrorResponse } = require('../../response');
const { Fragment } = require('../../model/fragment');

async function getFragments(req, res) {
  try {
    let fragments;
    fragments = await Fragment.byUser(req.user, req.query.expand);
    res.status(200).json(createSuccessResponse({ fragments: fragments }));
  } catch (err) {
    res.status(404).json(createErrorResponse(404, 'An error occurs'));
  }
}

async function getFragmentInfo(req, res) {
  try {
    const fragment = await Fragment.byId(req.user, req.params.id);
    res.status(200).json(createSuccessResponse({ fragment: fragment }));
  } catch (err) {
    res.status(404).json(createErrorResponse(404, 'Fragment not found'));
  }
}

module.exports.getFragments = getFragments;
module.exports.getFragmentInfo = getFragmentInfo;
