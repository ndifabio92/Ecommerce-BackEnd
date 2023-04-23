import { expect, jest, test } from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../app';
import Product from '../../models/productManager';
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from '../../controller/product';
import initialProducts from '../mock/mock-products.json';

const api = supertest(server.app);

beforeEach(async () => {
    await Product.deleteMany({});

    const product = new Product(initialProducts[0]);
    product.save();

    const product2 = new Product(initialProducts[1]);
    product2.save();
});

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});


describe('API GET PRODUCTS', () => {
    test('/api/products/', async () => {
        const { status, body } = await api.get('/api/products', getProducts);
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(initialProducts.length);
    });

    test('/api/products/?limit=2', async () => {
        const { status, body } = await api.get('/api/products/?limit=2', getProducts);
        expect(status).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(2);
    });

    test('/api/products/:id ', async () => {
        const { status, body } = await api.get(`/api/products/${initialProducts[1]._id}`, getProductById);
        expect(status).toBe(200);
        expect(body).toEqual(initialProducts[1]);
    });

    describe('ERROR GET API', () => {
        test('/api/products/643c0c7701d8fb15b03506fa', async () => {
            const id = '643c0c7701d8fb15b03506fa';
            const { status, body } = await api.get(`/api/products/${id}`, getProductById);
            expect(status).toBe(400);
            expect(body.errors[0].msg).toContain(`El producto con el id ${id} no existe`);
        });
    });

});

describe('API POST PRODUCTS', () => {
    test('/api/products', async () => {
        const newProduct = {
            "title": "producto prueba",
            "description": "Este es un producto prueba",
            "code": "test",
            "price": 200.2,
            "status": true,
            "stock": 10,
            "category": "electronica",
            "thumbnail": [
                "path1",
                "path2",
                "path3"
            ],
        };
        const { status, body } = await api.post('/api/products', postProduct).send(newProduct);

        expect(status).toBe(201);
        expect(body.msg).toContain('Producto creado');
    });

    describe('ERRORS POST API', () => {
        test('CREATE A PRODUCT WITH CODE EXIST', async () => {
            const newProduct = {
                "title": "producto prueba",
                "description": "Este es un producto prueba",
                "code": initialProducts[0].code,
                "price": 200.2,
                "status": true,
                "stock": 10,
                "category": "electronica",
                "thumbnail": [
                    "path1",
                    "path2",
                    "path3"
                ],
            };
            const { status, body } = await api.post('/api/products', postProduct).send(newProduct);

            expect(status).toBe(400);
            expect(body.errors[0].msg).toStrictEqual(`El codigo ${initialProducts[0].code} ya existe`);
        });
    });
});

describe('API PUT PRODUCTS', () => {
    test('/api/products/:id', async () => {
        const updateProduct = {
            "_id": initialProducts[1]._id,
            "title": "producto prueba actualizado",
            "description": "Este es un producto prueba actualizado",
            "code": "test",
            "price": 200.2,
            "status": true,
            "stock": 100,
            "category": "electronica",
            "thumbnail": [
                "path1",
                "path2",
                "path3"
            ],
        };

        const { status, body } = await api.put(`/api/products/${initialProducts[1]._id}`, postProduct).send(updateProduct);

        const product = { msg: "Producto actualizado", result: { ...updateProduct, _id: initialProducts[1]._id, "__v": 0 } };
        expect(status).toBe(200);
        expect(body).toStrictEqual(product);
    });

    describe('ERRORS PUT API', () => {
        test(`DONT'T SEND PRODUCT ID`, async () => {
            const { status } = await api.put('/api/products/', putProduct);
            expect(status).toBe(404);
        });

        test('SEND A CODE EXIST USSING FOR ANOTHER PRODUCT', async () => {
            const updateProduct = {
                "_id": initialProducts[1]._id,
                "title": "producto prueba actualizado",
                "description": "Este es un producto prueba actualizado",
                "code": initialProducts[0].code,
                "price": 200.2,
                "status": true,
                "stock": 100,
                "category": "electronica",
                "thumbnail": [
                    "path1",
                    "path2",
                    "path3"
                ],
            };
            const { status, body } = await api.put(`/api/products/${initialProducts[1]._id}`, postProduct).send(updateProduct);

            expect(status).toBe(500);
            expect(body).toStrictEqual({ "error": "El codigo ingresado ya esta siendo utilizado por otro producto" });
        });
    });

});


describe('API DELETE PRODUCTS', () => {
    test('/api/products/:id', async () => {
        const productDelete = { msg: "Producto eliminado", result: { ...initialProducts[1], status: false } };

        const { status, body } = await api.delete(`/api/products/${initialProducts[1]._id}`, deleteProduct);

        expect(status).toBe(200);
        expect(body).toStrictEqual(productDelete);
    });

    describe('ERRORS DELETE API', () => {
        test(`DONT'T SEND PRODUCT ID`, async () => {
            const { status } = await api.delete('/api/products/', deleteProduct);
            expect(status).toBe(404);
        });

        test('SEND A WRONG ID FORMAT FOR PRODUCT ID', async () => {
            const { status, body } = await api.delete('/api/products/1', deleteProduct);
            expect(status).toBe(400);
            expect(body.errors[0].msg).toContain('No es un id valido');
        });

        test(`PRODUCT ID DOESN'T EXIST`, async () => {
            const id = '643c0c7701d8fb15b03506fa';
            const { status, body } = await api.delete(`/api/products/${id}`, deleteProduct);
            expect(status).toBe(400);
            expect(body.errors[0].msg).toContain(`El producto con el id ${id} no existe`);
        });
    });
});