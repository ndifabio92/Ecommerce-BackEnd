import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../app';
import initialProducts from '../mock/mock-products.json';
import initialCarts from '../mock/mock-carts.json';
import Cart from '../../models/shoppingCartManager';
import Product from '../../models/productManager';
import { getCartById, postProductByCartId } from '../../controller/shoppingCart';
import { postProduct } from '../../controller/product';

const api = supertest(server.app);

beforeEach(async () => {
    await Product.deleteMany({});

    const product = new Product(initialProducts[0]);
    product.save();

    const product2 = new Product(initialProducts[1]);
    product2.save();

    await Cart.deleteMany({});
    const cart1 = new Cart(initialCarts[0]);
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
        expect(body).toEqual(initialCarts[0]);
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
                    "_id": initialProducts[0]._id,
                    "quantity": 1
                },
                {
                    "_id": initialProducts[1]._id,
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
        expect(body.products).toEqual([...initialCarts[0].products, { _id: initialProducts[1]._id, quantity: 1 }]);
    });
});

describe('API POST SOME PRODUCT BY CART ID', () => {
    test('/api/carts/cid/product/pid', async () => {
        const { status, body } = await api.post(`/api/carts/${initialCarts[0]._id}/product/${initialProducts[0]._id}`, postProductByCartId);
        expect(status).toBe(200);
        expect(body.products[0]).toEqual({ _id: initialProducts[0]._id, quantity: initialCarts[0].products[0].quantity + 1 });
    });
});