import { config } from '../config';
import { logger } from '../logger';
import { WsApiResponse } from '../types/ws-api.type';
import { WsResponseCountryError } from '../errors/ws-response-country.error';
import { ResponseError } from '../errors/response.error';

export class WeatherStackService {

    public async get(city: string, state: string, zipCode: number): Promise<WsApiResponse> {
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${config?.wsApiAccessKey}&query=${city},${state},${zipCode}`);

            if (!response.ok) {
                throw new ResponseError(response.status);
            }

            logger.info(`Successfully received weather information for ${city}, ${state}, ${zipCode}.`);

            const wsApiResponse = await response.json() as WsApiResponse;

            if (wsApiResponse.location.country !== 'United States of America') {
                throw new WsResponseCountryError(wsApiResponse.location.country);
            }

            return wsApiResponse;
        } catch (err: any) {
            logger.error(`Error fetching data: ${err.message}`);

            throw err;
        }
    }
}