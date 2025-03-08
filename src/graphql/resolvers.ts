import { propertyService } from '../instances';
import { GraphQLError } from 'graphql/error';

const errorWrapper = (resolver: any) => async (parent: any, args: any, context: any, info: any) => {
    try {
        return await resolver(parent, args, context, info);
    } catch (err: any) {
        throw new GraphQLError(err.message, {
            extensions: { code: err?.code || 500 }
        });
    }
};

export const resolvers = {
    Query: {
        getProperties: errorWrapper(async (_: any, { page, limit }: { page: number, limit: number }) => await propertyService.getAll(page, limit)),
        getPropertyById: errorWrapper(async (_: any, { id }: { id: string }) => await propertyService.getById(id)),
    },
    Mutation: {
        createProperty: async (_: any, { city, street, state, zipCode }: any) =>
            await propertyService.create(city, street, state, zipCode),
        deleteProperty: async (_: any, { id }: { id: string }) =>
            await propertyService.delete(id),
    },
};