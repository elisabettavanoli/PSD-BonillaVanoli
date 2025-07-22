import { NotFoundError } from '../exception/NotFoundError.js';

const trials = new Map();
let trialIdSequence = 0;

export function createTrial(newTrial){
    const currTrialId = trialIdSequence;
    trialIdSequence++;

    trials[currTrialId] = { ...newTrial };

    return currTrialId;
}

export function getTrials(){
    return trials;
}

export function deleteTrial(trialId){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    delete trials[trialId];
}

export function createResult(trialId, collaboratorId, result){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    if (!trials[trialId].results) {
        trials[trialId].results = {};
    }

    trials[trialId].results[collaboratorId] = result;
}

export function getResults(trialId){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);
    
    return Object.values(trials[trialId].results) || [];
}

export function createReport(trialId, report){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    trials[trialId].report = report;
}