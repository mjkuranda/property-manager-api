import { ApiError } from './api.error';

export class NotValidObjectIdError extends ApiError {

    constructor() {
        super('Not valid object id!', 400);
    }
}