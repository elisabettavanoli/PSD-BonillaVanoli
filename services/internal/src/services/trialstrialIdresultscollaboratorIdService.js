import * as trialsRepository from '../repositories/trialsRepository.js';

export function createResult(req, res) {
    try {
        trialsRepository.createResult(req.params.trialId, req.params.collaboratorId, req.body);
        res.send({
            "description": "Successfully created or updated the trial result"
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
