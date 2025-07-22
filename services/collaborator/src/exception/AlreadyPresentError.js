export class AlreadyPresentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AlreadyPresentError';
    }
}