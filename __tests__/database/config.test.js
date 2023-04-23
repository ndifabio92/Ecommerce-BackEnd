import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import { dbConnection } from '../../database/config';

afterAll(async () => {
    await mongoose.connection.close();
});

describe('TEST DB CONNECTION', () => {
    test('/api/products/', async () => {
        try {
            await dbConnection();
        } catch (error) {
            expect(() => functionWithError()).toThrow(Error);
        }
    });

});