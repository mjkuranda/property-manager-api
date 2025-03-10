import { WeatherStackService } from '../services/weather-stack.service';

jest.mock('../config', () => ({
    wsApiAccessKey: 'mocked-access-key',
}));

describe('WeatherStackService', () => {
    let weatherStackService: WeatherStackService;

    beforeEach(() => {
        weatherStackService = new WeatherStackService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch weather data successfully', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ current: {}, location: { country: 'United States of America', lat: 1, lon: 1 } }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

        const result = await weatherStackService.get('New York', 'NY', 10002);

        expect(result).toEqual({ current: {}, location: { country: 'United States of America', lat: 1, lon: 1 } });
        expect(fetch).toHaveBeenCalledWith('http://api.weatherstack.com/current?access_key=undefined&query=New York,NY,10002');
    });

    test('should throw error on fetch failure', async () => {
        const mockResponse = { ok: false, status: 500 };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

        await expect(weatherStackService.get('New York', 'NY', 10002)).rejects.toThrow('HTTP error! Status: 500');
    });

    test('should throw error on request failure', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Request failed'));

        await expect(weatherStackService.get('New York', 'NY', 10002)).rejects.toThrow('Request failed');
    });
});
