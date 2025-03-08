import { CreatePropertyDto } from '../dtos/create-property.dto';
import { PropertyFilters } from './property.repository.type';
import { SortOrder } from 'mongoose';

export interface GetPropertiesParams {
    page: number;
    limit: number;
    filters?: PropertyFilters;
    sortOrder?: SortOrder;
}

export interface PropertyByIdParam {
    id: string;
}

export type CreatePropertyParams = Pick<CreatePropertyDto, 'city' | 'street' | 'state' | 'zipCode'>;