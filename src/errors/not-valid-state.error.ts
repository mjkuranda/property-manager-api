import { ApiError } from './api.error';

export class NotValidStateError extends ApiError {

    constructor(state: string) {
        super(`${state} is not a valid US state!`, 400);
    }
}