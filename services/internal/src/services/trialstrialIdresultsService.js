import * as trialsRepository from '../repositories/trialsRepository.js';

export function getResults(req, res) {
    try {
        const results = trialsRepository.getResults(req.params.trialId);
        res.send({ results: results });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

