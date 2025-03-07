import mongoose, { Model } from 'mongoose';
import { propertySchema } from '../schemas/property.schema';
import { PropertyDocument } from '../documents/property.document';

export const propertyModel: Model<PropertyDocument> = mongoose.model('Property', propertySchema) as unknown as Model<PropertyDocument>;