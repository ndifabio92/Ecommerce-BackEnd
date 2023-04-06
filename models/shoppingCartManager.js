import * as fs from 'fs/promises';
import ProductManager from './productManager.js';

class ShoppingCartManager {
    #nextId;

    constructor() {
        this.#nextId = 1;
        this.path = './shoppingCart.json';
    }

    async addCart(shoppingCart) {
        try {
            if (!shoppingCart) throw new Error('El carrito de compras no puede estar vacio');

            await this.getProductById(shoppingCart);

            const arrCarts = await this.getShoppingCart();
            const addCart = [...arrCarts, {
                id: this.#nextId++,
                products: shoppingCart,
            }]

            await fs.writeFile(this.path, JSON.stringify(addCart));

            return {message: `Carrito de compras creado con exito`};

        } catch (error) {
            throw error;
        }
    }

    async addProductToCartById(cid, pid) {
        try {
            const arrCarts = await this.getShoppingCart();
            const cart = arrCarts.find(item => item.id === cid);
            if (!cart) throw new Error('El id de carrito no existe');

            const product = cart.products.find(item => item.id === pid);
            product ? product.quantity += 1 : cart.products = [...cart.products, {id: pid, quantity: 1}];

            await fs.writeFile(this.path, JSON.stringify(arrCarts));

            return {message: `El producto se a agregado correctamente`};
        } catch (error) {
            throw {error: error.message};
        }
    }

    async getShoppingCart() {
        try {
            const data = await this.readFile();
            return JSON.parse(data);

        } catch (error) {
            throw error;
        }
    }

    async getProductByShoppingCartId(id) {
        try {

            const data = await this.readFile();
            const products = JSON.parse(data).find(product => product.id === id);

            if (!products) throw new Error("El carrito de compras no existe");

            return products.products;

        } catch (error) {
            throw {error: error.message};
        }
    }

    async getProductById(arrProducts) {
        try {
            const product = new ProductManager();
            for (const item of arrProducts) {
                await product.getProductById(item.id);
            }
        } catch (error) {
            throw error;
        }
    }

    async createFile() {
        try {
            await fs.readFile(this.path, {encoding: 'utf-8'});
            this.#nextId = await this.getLastId();
            return 'El archivo ya se encuentra creado';
        } catch (error) {
            await fs.writeFile(this.path, '[]',);
            return 'Archivo creado con exito';
        }
    }

    async readFile() {
        try {
            return await fs.readFile(this.path, {encoding: 'utf-8'});
        } catch (error) {
            throw error;
        }
    }

    async getLastId() {
        try {
            let lastId = this.#nextId;
            const data = await this.getShoppingCart();
            for (let i = 0; i < data.length; i++) {
                if (data[i].id > lastId) {
                    lastId = data[i].id;
                }
            }

            return lastId + 1;

        } catch (error) {
            throw error;
        }
    }
}

export default ShoppingCartManager;