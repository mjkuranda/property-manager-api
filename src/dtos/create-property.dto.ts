import { WsApiCurrentWeatherObject } from '../types/ws-api.type';

export interface CreatePropertyDto {
    city: string;
    street: string;
    state: string;
    zipCode: number;
    weatherData: WsApiCurrentWeatherObject;
    lat: number;
    long: number;
    createdAt: number;
}