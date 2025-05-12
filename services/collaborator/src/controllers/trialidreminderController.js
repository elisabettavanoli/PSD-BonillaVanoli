const service = require('../services/trialidreminderService.js');

module.exports.trialReminder = function trialReminder(req, res) {
    service.trialReminder(req, res);
}

