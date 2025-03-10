// NOTE: I don't need to know this structure. For future development, you can modify it and change.
// NOTE: This whole structure is passed to the record, and you don't proceed this data during saving.
export type WsApiCurrentWeatherObject = any;

export interface WsApiResponse {
    current: WsApiCurrentWeatherObject,
    location: {
        country: string;
        lat: string;
        lon: string;
    }
}