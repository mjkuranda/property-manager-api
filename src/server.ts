import { config } from './config';
import { logger } from './logger';
import { initializeApp, instantiateServer } from './helpers/server.helper';
import { mongoService } from './instances';

const app = initializeApp();

instantiateServer(app, async () => {
    logger.info(`Server started working on ${config.port} port.`);

    await mongoService.connect();
});