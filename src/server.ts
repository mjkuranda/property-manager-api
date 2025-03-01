import { config } from './config';
import { initializeApp, instantiateServer } from './helpers/server.helper';

const app = initializeApp();

instantiateServer(app, async () => {
    console.log(`Server started working on ${config.port} port.`);
});