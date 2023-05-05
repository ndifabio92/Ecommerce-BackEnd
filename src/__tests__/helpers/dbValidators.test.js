import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../app.js';
import { cartExist, codeExist, productExist } from '../../helpers/dbValidators.js';
import Product from '../../models/productSchema.js';
import Cart from '../../models/cartSchema.js';
import initialProducts from '../mock/mock-products.json';
import initialCarts from '../mock/mock-carts.json'

supertest(server.app);

beforeEach(async () => {
    await Product.deleteMany({});
    const product = new Product(initialProducts[0]);
    product.save();

    await Cart.deleteMany({});

    const cart1 = new Cart(initialCarts[0]);
    cart1.save();
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});


describe('DB VALIDATORS', () => {
    test('code exist', async () => {
        try {
            await codeExist(initialProducts[0].code);
        } catch (error) {
            expect(error.toString()).toEqual(`Error: El codigo ${initialProducts[0].code} ya existe`);
        }
    });

    test('product not exist', async () => {
        try {
            await productExist(initialProducts[0]._id);
        } catch (error) {
            expect(error.toString()).toEqual(`Error: El producto con el id ${initialProducts[0]._id} no existe o se encuentra eliminado`);
        }
    });

    test('cart not exist', async () => {
        try {
            await cartExist(initialCarts[1]._id);
        } catch (error) {
            expect(error.toString()).toEqual(`Error: El carrito de compra con el id ${initialCarts[1]._id} no existe`);
        }
    });
});