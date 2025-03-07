import dotenv from 'dotenv';
import { ApiConfig } from './types/config.type';

function initConfig(): ApiConfig {
    dotenv.config();

    return {
        port: process.env.PORT || 3000,
        wsApiAccessKey: process.env.WEATHERSTACK_API_ACCESS_KEY || 'abc123',
        mongoHostname: process.env.MONGO_HOSTNAME || 'localhost',
        mongoPort: process.env.MONGO_PORT || 27017,
        mongoDbName: process.env.MONGO_DBNAME || 'propertydb'
    };
}

export const config: ApiConfig = initConfig();
