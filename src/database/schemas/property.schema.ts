import { InferSchemaType, Schema } from 'mongoose';
import { usStates } from '../../constants';

export const propertySchema = new Schema(
    {
        city: { type: String, required: true },
        street: { type: String, required: true },
        state: {
            type: String,
            required: true,
            uppercase: true,
            validate: {
                validator: function(value: string) {
                    return usStates.includes(value);
                },
                message: (props: any) => `${props.value} is not a valid US state!`
            }
        },
        zipCode: {
            type: Number,
            required: true,
            validate: {
                validator: (v: number) => /^\d{5}$/.test(String(v)),
                message: 'Zip code must be exactly 5 digits.'
            }
        },
        weatherData: { type: Object, required: true },
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
        createdAt: { type: Number, required: true }
    }
);

propertySchema.index({ createdAt: 1 });

export type PropertySchema = InferSchemaType<typeof propertySchema>;