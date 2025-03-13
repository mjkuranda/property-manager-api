import { ApiError } from './api.error';

export class ResponseError extends ApiError {

    constructor(status: number) {
        super(`HTTP error! Status: ${status}`, status);
    }
}