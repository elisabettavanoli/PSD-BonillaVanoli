import * as trialsRepository from '../repositories/trialsRepository.js';

export function createTrial(req, res) {
    try{
        trialsRepository.createTrial(req.body)
        res.status(201).send({ description: 'Trial created' });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else  if (err.name === 'AlreadyPresentError') {
            res.status(400).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
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