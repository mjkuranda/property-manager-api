import { logger } from '../logger';
import mongoose from 'mongoose';
import { config } from '../config';

export class MongoService {

    public async connect(): Promise<void> {
        const uri = this.getMongoUri();

        const listener = async (): Promise<void> => {
            logger.info('Closing MongoDB connection...');

            try {
                await mongoose.disconnect();
                logger.info('MongoDB connection closed.');
                process.exit(0);
            } catch (error) {
                logger.error('Error while disconnecting MongoDB:', error);
                process.exit(1);
            }
        };

        try {
            logger.info('Attempt to connect to the MongoDB.');
            await mongoose.connect(uri);

            logger.info('Successfully connected to MongoDB.');
        } catch (err) {
            logger.error('Error connecting to MongoDB:', err);
        }

        process.on('SIGINT', listener);
        process.on('SIGTERM', listener);
    }

    private getMongoUri(): string {
        return `mongodb://${config.mongoHostname}:${config.mongoPort}/${config.mongoDbName}`;
    }
}