import { InferSchemaType, Schema } from 'mongoose';

export const propertySchema = new Schema(
    {
        city: { type: String, required: true },
        street: { type: String, required: true },
        state: { type: Number, required: true },
        zipCode: { type: String, required: true },
        weatherData: { type: Object, required: true },
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
        createdAt: { type: Number, required: true }
    }
);

propertySchema.index({ createdAt: 1 });

export type PropertySchema = InferSchemaType<typeof propertySchema>;