import express, { Express } from 'express';
import { Server } from 'node:http';
import cors from 'cors';
import { config } from '../config';
import { createYoga } from 'graphql-yoga';
import { schema } from '../graphql/schema';

export function initializeApp(): Express {
    const app = express();
    const yoga = createYoga({ schema });

    app.use(cors());
    app.use(express.json());
    app.use('/graphql', yoga);

    return app;
}

export function instantiateServer(app: Express, listeningListener: () => void, port?: string | number): Server {
    return app.listen(port ?? config.port, listeningListener);
}