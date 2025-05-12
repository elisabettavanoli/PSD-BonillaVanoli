const service = require('../services/trialrequestParticipationService.js');

module.exports.requestParticipation = function requestParticipation(req, res) {
    service.requestParticipation(req, res);
}

