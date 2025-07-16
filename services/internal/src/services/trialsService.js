import * as trialsRepository from '../repositories/trialsRepository.js';

export function createTrial(req, res) {
    const trialId = trialsRepository.createTrial(req.body);
    res.status(201).send({ trialId: String(trialId) });
}

