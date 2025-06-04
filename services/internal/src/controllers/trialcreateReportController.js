const service = require('../services/trialcreateReportService.js');

module.exports.createReport = function createReport(req, res) {
    service.createReport(req, res);
}

