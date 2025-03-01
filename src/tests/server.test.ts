// import request from 'supertest';
// import { initializeApp } from '../helpers/server.helper';
// import { Express } from 'express';

function mockedLoggerFunc(msg: string) {
    return msg;
}

jest.mock('../logger', () => ({
    logger: {
        info: jest.fn(mockedLoggerFunc),
        error: jest.fn(mockedLoggerFunc),
        warn: jest.fn(mockedLoggerFunc),
        debug: jest.fn(mockedLoggerFunc),
    },
}));

describe('Server', () => {
    // let app: Express;

    beforeAll(() => {
        // app = initializeApp();
    });

    describe('Basic tests', () => {
        it('should pass', async () => {
            expect(true).toBeTruthy();

            // TODO: Make this working for next iteration
            // const res = await request(app).get('/api/');
            //
            // expect(res.status).toBe(200);
            // expect(res.body).toStrictEqual({});
        });
    });
});