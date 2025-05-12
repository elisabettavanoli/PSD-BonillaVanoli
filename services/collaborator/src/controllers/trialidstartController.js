const service = require('../services/trialidstartService.js');

module.exports.trialStarted = function trialStarted(req, res) {
    service.trialStarted(req, res);
}

