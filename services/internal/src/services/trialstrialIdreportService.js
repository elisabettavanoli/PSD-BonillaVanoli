import * as trialsRepository from '../repositories/trialsRepository.js';

export function createReport(req, res, next) {
    try {
        trialsRepository.createReport(req.params.trialId, req.body);
        res.send({
            "description": "The report was successfully created"
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

