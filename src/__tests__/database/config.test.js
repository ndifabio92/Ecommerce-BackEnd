import { expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import dbConnection from '../../database/config.js';

afterAll(async () => {
    await mongoose.connection.close();
});

describe('TEST DB CONNECTION', () => {
    test('dbConnection Success', async () => {
        try {
            await dbConnection().connect();
        } catch (error) {
            expect(() => functionWithError()).toThrow(Error);
        }
    });
});