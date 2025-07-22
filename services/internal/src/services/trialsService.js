import * as trialsRepository from '../repositories/trialsRepository.js';

export function createTrial(req, res) {
    const trialId = trialsRepository.createTrial(req.body);
    res.status(201).send({ trialId: String(trialId) });
}

export function getTrials(req, res) {
    try{
        const trials = trialsRepository.getTrials()
        res.send({ trials: trials });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    }
}