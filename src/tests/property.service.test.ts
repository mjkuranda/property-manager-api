import { PropertyService } from '../services/property.service';
import { PropertyRepository } from '../database/repositories/property.repository';
import { WeatherStackService } from '../services/weather-stack.service';
import { logger } from '../logger';
import mongoose from 'mongoose';
import { propertyModel } from '../database/models/property.model';
import { NotFoundError } from '../errors/not-found.error';

jest.mock('../database/repositories/property.repository');
jest.mock('../services/weather-stack.service');
jest.mock('../logger');
jest.mock('mongoose');

describe('PropertyService', () => {
    let propertyService: PropertyService;
    let propertyRepository: PropertyRepository;
    let weatherStackService: WeatherStackService;

    beforeEach(() => {
        propertyRepository = new PropertyRepository(propertyModel);
        weatherStackService = new WeatherStackService();
        propertyService = new PropertyService(propertyRepository, weatherStackService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return properties for getAll', async () => {
        const mockChunk = { properties: [], total: 0, page: 1, pages: 1 };
        jest.spyOn(propertyRepository, 'getAll').mockResolvedValueOnce(mockChunk as any);

        const result = await propertyService.getAll(1, 10);

        expect(result).toEqual(mockChunk);
        expect(logger.info).toHaveBeenCalledWith('Found 0 properties in total.');
    });

    test('should throw error for invalid id in getById', async () => {
        const invalidId = 'invalid-id';

        await expect(propertyService.getById(invalidId)).rejects.toThrow('Not valid object id!');
    });

    test('should throw NotFoundError if property not found', async () => {
        const id = '00000020f51bb4362eee2a4d';

        jest.spyOn(mongoose, 'isValidObjectId').mockResolvedValueOnce(true as never);
        propertyRepository.getById = jest.fn().mockResolvedValue(null);

        await expect(propertyService.getById(id)).rejects.toThrowError(NotFoundError);

        expect(logger.error).toHaveBeenCalledWith(`Property with "${id}" ID does not exist.`);
    });

    test('should create property successfully', async () => {
        const mockWeatherResponse = { current: {}, location: { lat: 1, lon: 1 } };
        const mockCreateResponse = { id: '1', city: 'Test City' };
        jest.spyOn(weatherStackService, 'get').mockResolvedValueOnce(mockWeatherResponse as any);
        jest.spyOn(propertyRepository, 'create').mockResolvedValueOnce(mockCreateResponse as any);

        const result = await propertyService.create('New York',  'unknown', 'NY', 10002);

        expect(result).toEqual(mockCreateResponse);
        expect(propertyRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            city: 'New York',
            street: 'unknown',
            state: 'NY',
            zipCode: 10002,
        }));
    });

    test('should delete property', async () => {
        const mockDeleteResponse = { success: true, message: 'Property deleted' };
        jest.spyOn(propertyRepository, 'delete').mockResolvedValueOnce(mockDeleteResponse as any);
        jest.spyOn(mongoose, 'isValidObjectId').mockResolvedValueOnce(true as never);

        const result = await propertyService.delete('valid-id');

        expect(result).toEqual(mockDeleteResponse);
        expect(propertyRepository.delete).toHaveBeenCalledWith('valid-id');
    });

    test('should throw error for invalid id in delete', async () => {
        const invalidId = 'invalid-id';

        await expect(propertyService.delete(invalidId)).rejects.toThrow('Not valid object id!');
    });
});
