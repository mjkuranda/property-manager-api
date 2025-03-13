import { PropertyRepository } from '../database/repositories/property.repository';
import { PropertyChunk, PropertyFilters } from '../types/property.repository.type';
import { PropertyDocument } from '../database/documents/property.document';
import { logger } from '../logger';
import { WeatherStackService } from './weather-stack.service';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { isValidObjectId, SortOrder } from 'mongoose';
import { usStates } from '../constants';
import { NotValidStateError } from '../errors/not-valid-state.error';
import { NotValidObjectIdError } from '../errors/not-valid-object-id.error';
import { NotFoundError } from '../errors/not-found.error';

export class PropertyService {

    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly weatherStackService: WeatherStackService
    ) {}

    public async getAll(page: number = 1, limit: number = 10, filters?: PropertyFilters, sortOrder?: SortOrder): Promise<PropertyChunk> {
        const chunk: PropertyChunk = await this.propertyRepository.getAll(page, limit, filters, sortOrder);

        logger.info(`Found ${chunk.total} properties in total.`);

        return chunk;
    }

    public async getById(id: string): Promise<PropertyDocument> {
        if (!isValidObjectId(id)) {
            logger.error('Not valid object id.');

            throw new NotValidObjectIdError();
        }

        const property = await this.propertyRepository.getById(id);

        if (!property) {
            const message = `Property with "${id}" ID does not exist.`;

            logger.error(message);

            throw new NotFoundError(message);
        }

        logger.info(`Property with "${id}" ID has been found.`);

        return property;
    }

    public async create(city: string, street: string, state: string, zipCode: number) {
        if (!usStates.includes(state)) {
            throw new NotValidStateError(state);
        }

        let response;

        // eslint-disable-next-line no-useless-catch
        try {
            response = await this.weatherStackService.get(city, state, zipCode);
        } catch (err: any) {
            throw err;
        }

        const { current, location } = response;
        const { lat, lon } = location;
        const dto: CreatePropertyDto = { city, street, state, zipCode, weatherData: current, lat: Number(lat), long: Number(lon), createdAt: Date.now() };

        return await this.propertyRepository.create(dto);
    }

    public async delete(id: string) {
        if (!isValidObjectId(id)) {
            logger.error('Not valid object id.');

            throw new NotValidObjectIdError();
        }

        const wasDeleted = await this.propertyRepository.delete(id);

        if (!wasDeleted) {
            throw new NotFoundError(`Property with "${id}" ID has not been found.`);
        }

        return { success: true, message: 'Property deleted' };
    }
}