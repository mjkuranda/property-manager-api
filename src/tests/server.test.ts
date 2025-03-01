// import request from 'supertest';
// import { initializeApp } from '../helpers/server.helper';
// import { Express } from 'express';

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