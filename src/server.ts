import { config } from './config';
import { logger } from './logger';
import { initializeApp, instantiateServer } from './helpers/server.helper';

const app = initializeApp();

instantiateServer(app, async () => {
    logger.info(`Server started working on ${config.port} port.`);
});