import * as trialsRepository from '../repositories/trialsRepository.js';

export function trialReminder(req, res) {
    try {
        trialsRepository.createReminder(req.params.trialId, req.body);
        res.status(201).send({ description: 'Reminder created' });
    } catch (err) {
        console.error(err);
        if (err.name === 'NotFoundError') {
            res.status(404).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

