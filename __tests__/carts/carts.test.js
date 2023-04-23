import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../app';
import initialCarts from '../mock/mock-carts.json'
import Cart from '../../models/shoppingCartManager';

beforeEach(async () => {
    await Cart.deleteMany({});

    const cart1 = new Cart(initialCarts[0]);
    cart1.save();
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
})
