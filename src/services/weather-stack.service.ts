import { config } from '../config';
import { logger } from '../logger';
import { WsApiResponse } from '../types/ws-api.type';

export class WeatherStackService {

    public async get(city: string, state: string, zipCode: string): Promise<WsApiResponse> {
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${config.wsApiAccessKey}&query=${city},${state},${zipCode}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            logger.info(`Successfully received weather information for ${city}, ${state}, ${zipCode}.`);

            return await response.json() as WsApiResponse;
        } catch (err: any) {
            logger.error(`Error fetching data: ${err.message}`);

            throw err;
        }
    }
}