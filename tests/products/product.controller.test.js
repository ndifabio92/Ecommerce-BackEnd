import { expect, jest, test } from '@jest/globals';
import supertest from 'supertest';
import server from '../../app';
import Product from '../../models/productManager';
import { deleteProduct, getProductById, getProducts, postProduct } from '../../controller/product';
import initialProducts from '../mock/mock-products.json';

const api = supertest(server.app);

beforeEach(async () => {
    await Product.deleteMany({});

    const product = new Product(initialProducts[0]);
    product.save();

    const product2 = new Product(initialProducts[1]);
    product2.save();
});


describe('API GET PRODUCTS', () => {
    test('/api/products/', async () => {
        const response = await api.get('/api/products', getProducts);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(initialProducts.length);
    });

    test('/api/products/?limit=2', async () => {
        const response = await api.get('/api/products/?limit=2', getProducts);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    test('/api/products/:id ', async () => {
        const response = await api.get(`/api/products/${initialProducts[1]._id}`, getProductById);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(initialProducts[1]);
    });

    describe('ERROR API GET', () => {
        test('/api/products/:id ', async () => {
            const response = await api.get('/api/products/:id', getProductById);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
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


        const response = await api.post('/api/products', postProduct).send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('product');
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


        const response = await api.put(`/api/products/${initialProducts[1]._id}`, postProduct).send(updateProduct);

        const product = { msg: "Producto actualizado", result: { ...updateProduct, _id: initialProducts[1]._id, "__v": 0 } }
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(product);
    });
});


describe('API DELETE PRODUCTS', () => {
    test('/api/products/:id', async () => {
        const productDelete = { msg: "Producto eliminado", result: { ...initialProducts[1], status: false } };

        const response = await api.delete(`/api/products/${initialProducts[1]._id}`, deleteProduct)

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(productDelete);
    });
});
