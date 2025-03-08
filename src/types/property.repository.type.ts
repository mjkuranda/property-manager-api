import { PropertyDocument } from '../database/documents/property.document';

export interface PropertyChunk {
    properties: PropertyDocument[];
    total: number;
    page: number;
    pages: number;
}

export type PropertyFilters = Partial<Pick<PropertyDocument, 'city' | 'state' | 'zipCode'>>;