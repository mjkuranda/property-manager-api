import { HydratedDocument } from 'mongoose';
import { PropertySchema } from '../schemas/property.schema';

export type PropertyDocument = HydratedDocument<PropertySchema>;