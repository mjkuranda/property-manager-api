import { config } from '../config';
import { logger } from '../logger';
import { WsApiResponse } from '../types/ws-api.type';

export class WeatherStackService {

    public async get(city: string, state: string, zipCode: number): Promise<WsApiResponse | null> {
        try {
            const response = await fetch(`http://api.weatherstack.com/current?access_key=${config.wsApiAccessKey}&query=${city},${state},${zipCode}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            logger.info(`Successfully received weather information for ${city}, ${state}, ${zipCode}.`);

            return await response.json<WsApiResponse>();
        } catch (error) {
            logger.error(`Error fetching data: ${error.message}`);

            return null;
        }
    }
}