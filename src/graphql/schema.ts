import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = `
    type Property {
        id: ID
        city: String
        street: String
        state: String
        zipCode: String
        weatherData: WeatherData
        lat: Float
        long: Float
        createdAt: String
    }
    
    type PropertyChunk {
        properties: [Property!]!
        total: Int!
        page: Int!
        pages: Int!
    }
    
    type WeatherData {
        temperature: Float
        humidity: Int
        wind_speed: Float
    }
    
    type Query {
        getProperties(page: Int!, limit: Int!): PropertyChunk!
        getPropertyById(id: ID!): Property
    }
    
    type Mutation {
        createProperty(city: String!, street: String!, state: String!, zipCode: String!): Property
        deleteProperty(id: ID!): DeleteResponse
    }
    
    type DeleteResponse {
        success: Boolean!
        message: String!
    }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
