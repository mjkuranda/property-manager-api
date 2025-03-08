import { PropertyRepository } from './database/repositories/property.repository';
import { propertyModel } from './database/models/property.model';
import { PropertyService } from './services/property.service';
import { MongoService } from './services/mongo.service';
import { WeatherStackService } from './services/weather-stack.service';

export const propertyRepository = new PropertyRepository(propertyModel);

export const mongoService = new MongoService();
export const weatherStackService = new WeatherStackService();
export const propertyService = new PropertyService(propertyRepository, weatherStackService);
