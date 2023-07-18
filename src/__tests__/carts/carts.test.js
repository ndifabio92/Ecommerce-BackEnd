import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../index.js';
import Product from '../../data/models/productSchema.js';
import Cart from '../../data/models/cartSchema.js';
import initialProducts from '../mock/mock-products.json';
import initialCarts from '../mock/mock-carts.json';
import initialCartsResponse from '../mock/mock-carts-response.json';
import { getCartById, postProductByCartId } from '../../presentation/controller/cartController.js';
import { postProduct } from '../../presentation/controller/productController.js';

const api = supertest(server.app);

beforeEach(async () => {
    await Product.deleteMany({});

    const product = new Product(initialProducts[1]);
    product.save();

    const product2 = new Product(initialProducts[2]);
    product2.save();

    await Cart.deleteMany({});
    const cart = new Cart(initialCarts[0]);
    cart.save();

    const cart1 = new Cart(initialCarts[1]);
    cart1.save();
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});

describe('API GET CART BY ID', () => {
    test('/api/carts/:id', async () => {
        const { status, body } = await api.get(`/api/carts/${initialCarts[0]._id}`, getCartById);
        expect(status).toBe(200);
        expect(body).toEqual(initialCartsResponse[0]);
    });

    describe('ERROR GET CART', () => {
        test('/api/carts/:id ', async () => {
            const { status, body } = await api.get(`/api/carts/${initialProducts[1]._id}`, getCartById);
            expect(status).toBe(400);
            expect(body).toHaveProperty('errors');
            expect(body.errors[0].msg).toContain(`El carrito de compra con el id ${initialProducts[1]._id} no existe`);
        });
    });
});

describe('API POST CART', () => {
    test('/api/carts/', async () => {
        const newCart = {
            "products": [
                {
                    "_id": initialProducts[1]._id,
                    "quantity": 1
                },
                {
                    "_id": initialProducts[2]._id,
                    "quantity": 10
                }
            ]
        };

        const { status, body } = await api.post('/api/carts/', postProduct).send(newCart);
        expect(status).toBe(201);
        expect(body.msg).toBe('Carrito de compra creado');
    });
});

describe('API POST NEW PRODUCT BY CART ID', () => {
    test('/api/carts/cid/product/pid', async () => {
        const { status, body } = await api.post(`/api/carts/${initialCarts[0]._id}/product/${initialProducts[1]._id}`, postProductByCartId);
        expect(status).toBe(200);
        expect(body.products).toEqual([...initialCartsResponse[0].products, { id: initialProducts[1]._id, quantity: 1 }]);
    });
});

describe('API POST SOME PRODUCT BY CART ID', () => {
    test('/api/carts/cid/product/pid', async () => {
        const { status, body } = await api.post(`/api/carts/${initialCarts[1]._id}/product/${initialProducts[1]._id}`, postProductByCartId);
        expect(status).toBe(200);
        expect(body.products[0]).toEqual({ id: initialProducts[1]._id, quantity: initialCarts[0].products[0].quantity + 1 });
    });
});