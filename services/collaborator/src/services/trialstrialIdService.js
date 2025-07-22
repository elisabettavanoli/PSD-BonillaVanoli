import * as trialsRepository from '../repositories/trialsRepository.js';

export function deleteTrial(req, res) {
    try {
        trialsRepository.deleteTrial(req.params.trialId);
        res.status(204).send({ description: 'Trial deleted' });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

export function updateTrialStatus(req, res) {
    try {
        trialsRepository.updateTrialStatus(req.params.trialId);
        res.status(200).send({ description: 'Trial updated' });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

