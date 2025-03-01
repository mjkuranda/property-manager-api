import express, { Express } from 'express';
import { Server } from 'node:http';
import cors from 'cors';
import { config } from '../config';

export function initializeApp(): Express {
    const app = express();

    app.use(cors());
    app.use(express.json());
    // TODO: /api route

    return app;
}

export function instantiateServer(app: Express, listeningListener: () => void, port?: string | number): Server {
    return app.listen(port ?? config.port, listeningListener);
}