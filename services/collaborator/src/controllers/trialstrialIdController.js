import * as service from '../services/trialstrialIdService.js';

export function deleteTrial(req, res) {
    service.deleteTrial(req, res);
}

export function updateTrialStatus(req, res) {
    service.updateTrialStatus(req, res);
}

