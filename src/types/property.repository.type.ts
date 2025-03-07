import { PropertyDocument } from '../database/documents/property.document';

export interface PropertyChunk {
    properties: PropertyDocument[];
    total: number;
    page: number;
    pages: number;
}