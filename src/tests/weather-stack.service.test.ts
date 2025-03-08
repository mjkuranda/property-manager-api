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
            json: jest.fn().mockResolvedValue({ current: {}, location: { lat: 1, lon: 1 } }),
        };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

        const result = await weatherStackService.get('Test City', 'State', '12345');

        expect(result).toEqual({ current: {}, location: { lat: 1, lon: 1 } });
        expect(fetch).toHaveBeenCalledWith('http://api.weatherstack.com/current?access_key=undefined&query=Test City,State,12345');
    });

    test('should throw error on fetch failure', async () => {
        const mockResponse = { ok: false, status: 500 };
        jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse as any);

        await expect(weatherStackService.get('Test City', 'State', '12345')).rejects.toThrow('HTTP error! Status: 500');
    });

    test('should throw error on request failure', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Request failed'));

        await expect(weatherStackService.get('Test City', 'State', '12345')).rejects.toThrow('Request failed');
    });
});
