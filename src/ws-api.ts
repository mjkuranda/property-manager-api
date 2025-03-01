import { config } from './config';
import { logger } from './logger';
import { WsApiResponse } from './types/ws-api.type';

export async function wsApiCurrentWeatherCall(city: string, state: string, zipCode: number): Promise<WsApiResponse | null> {
    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${config.wsApiAccessKey}&query=${city},${state},${zipCode}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json<WsApiResponse>();
    } catch (error) {
        logger.error(`Error fetching data: ${error.message}`);

        return null;
    }
}