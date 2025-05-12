const service = require('../services/trialidresultService.js');

module.exports.trialResult = function trialResult(req, res) {
    service.trialResult(req, res);
}

