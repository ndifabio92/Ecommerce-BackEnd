import { expect, jest, test } from '@jest/globals';
import { dbConnection } from '../../database/config';

describe('TEST DB CONNECTION', () => {
    test('/api/products/', async () => {
        try {
            await dbConnection();
        } catch (error) {
            expect(() => functionWithError()).toThrow(Error);
        }
    });

});