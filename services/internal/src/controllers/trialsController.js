import * as service from '../services/trialsService.js';

export function createTrial(req, res) {
    service.createTrial(req, res);
}

export function getTrials(req, res){
    service.getTrials(req, res);
}