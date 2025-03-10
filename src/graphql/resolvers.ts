import { propertyService } from '../instances';
import { GraphQLError } from 'graphql/error';
import { CreatePropertyParams, GetPropertiesParams, PropertyByIdParam } from '../types/resolver.type';

const errorWrapper = (resolver: any) => async (parent: any, args: any, context: any, info: any) => {
    try {
        return await resolver(parent, args, context, info);
    } catch (err: any) {
        throw new GraphQLError(err.message, {
            extensions: { code: err?.statusCode || 500 }
        });
    }
};

export const resolvers = {
    Query: {
        getProperties: errorWrapper(async (_: any, { page, limit, filters, sortOrder }: GetPropertiesParams) => await propertyService.getAll(page, limit, filters, sortOrder)),
        getPropertyById: errorWrapper(async (_: any, { id }: PropertyByIdParam) => await propertyService.getById(id))
    },
    Mutation: {
        createProperty: errorWrapper(async (_: any, { city, street, state, zipCode }: CreatePropertyParams) =>
            await propertyService.create(city, street, state, zipCode)),
        deleteProperty: errorWrapper(async (_: any, { id }: PropertyByIdParam) =>
            await propertyService.delete(id)),
    },
};