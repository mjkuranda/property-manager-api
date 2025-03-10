import { ApiError } from './api.error';

export class WsResponseCountryError extends ApiError {

    constructor(country: string) {
        super(`Weather information was found for ${country} instead of US!`, 400);
    }
}