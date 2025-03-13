import { initializeApp } from '../helpers/server.helper';
import { Express } from 'express';

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
    let app: Express;

    beforeAll(() => {
        app = initializeApp();
    });

    describe('Basic tests', () => {
        test('should pass', async () => {
            expect(app).not.toBeUndefined();
        });
    });
});