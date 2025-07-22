import { NotFoundError } from '../exception/NotFoundError.js';
import { AlreadyPresentError } from '../exception/AlreadyPresentError.js'

const trials = {};

export function createTrial(trial) {
    if (trials[trial.trialId])
        throw new AlreadyPresentError(`Trial with id ${trial.trialId} already present`);

    const { trialId, ...trialData } = trial;

    trials[trialId] = {
        ...trialData,
        status: "WAITING_FOR_START"
    };
}

export function getTrials(){
    return trials;
}

export function updateTrialStatus(trialId, trialStatus){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    trials[trialId].status = trialStatus;
}

export function deleteTrial(trialId){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    delete trials[trialId];
}

export function createReminder(trialId, reminder){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    const reminders = trials[trialId].reminders;

    if(reminders)
        trials[trialId].reminders = [ ...reminders, reminder ];
    else 
        trials[trialId].reminders = [ reminder ]
}

export function createReport(trialId, report){
    if (!trials[trialId])
        throw new NotFoundError(`Trial with id ${trialId} not found`);

    trials[trialId].report = report;
}