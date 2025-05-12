const service = require('../services/trialidcancelledService.js');

module.exports.trialCancelled = function trialCancelled(req, res) {
    service.trialCancelled(req, res);
}

