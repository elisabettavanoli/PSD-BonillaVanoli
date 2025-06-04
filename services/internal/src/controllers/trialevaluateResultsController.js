const service = require('../services/trialevaluateResultsService.js');

module.exports.evaluateResults = function evaluateResults(req, res) {
    service.evaluateResults(req, res);
}

