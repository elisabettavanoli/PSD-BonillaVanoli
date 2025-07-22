import * as trialsRepository from '../repositories/trialsRepository.js';

export function trialReport(req, res) {
    try {
        trialsRepository.createReport(req.params.trialId, req.body);
        res.send({ description: "Report created or updated" });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

