import { Model, SortOrder } from 'mongoose';
import { PropertyDocument } from '../documents/property.document';
import { PropertyChunk, PropertyFilters } from '../../types/property.repository.type';
import { CreatePropertyDto } from '../../dtos/create-property.dto';

export class PropertyRepository {

    constructor(private readonly propertyModel: Model<PropertyDocument>) {}

    public async getAll(page: number = 1, limit: number = 10, filters?: PropertyFilters, sortOrder?: SortOrder): Promise<PropertyChunk> {
        const skip = (page - 1) * limit;
        const sortValue = sortOrder === 'asc' ? 1 : -1;

        const [properties, total] = await Promise.all([
            this.propertyModel.find(filters ?? {}).sort({ createdAt: sortValue }).skip(skip).limit(limit),
            this.propertyModel.countDocuments()
        ]);

        return {
            properties: properties as PropertyDocument[],
            total: total as number,
            page,
            pages: Math.ceil(total / limit)
        };
    }

    public async getById(id: string): Promise<PropertyDocument | null> {
        return this.propertyModel.findById(id);
    }

    public async create(propertyDto: CreatePropertyDto): Promise<PropertyDocument> {
        return this.propertyModel.create(propertyDto);
    }

    public async delete(id: string) {
        return this.propertyModel.findByIdAndDelete(id);
    }
}