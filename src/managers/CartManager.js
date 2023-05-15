import CartDao from "../daos/CartDao.js";
import ProductManager from "./ProductManager.js";

class CartManager {

    constructor() {
        this.dao = new CartDao();
    };

    async getOne(id) {
        try {
            const cartExist = await this.dao.getOne(id);
            if (!cartExist) throw new Error(`El carrito de compra con el id ${id} no existe`);

            return this.dao.getOne(id);
        } catch (error) {
            throw error;
        }
    };

    async create(data) {
        try {
            const productManager = new ProductManager();

            for (const item of data.products) {
                await productManager.getOne(item.id);
            }

            return this.dao.create(data);
        } catch (error) {
            throw error;
        }
    };

    async insert(cid, pid) {
        try {
            await this.getOne(cid);

            const { products } = await this.dao.getOne(cid);

            const arrProducts = products.find(item => item.id.toString() === pid);

            const arrUpdated = !arrProducts ? [...products, { id: pid, quantity: 1 }] : [...products, arrProducts.quantity = arrProducts.quantity + 1];

            const newProducts = arrUpdated.map(item => {
                const { id, quantity } = item;
                return {
                    _id: id,
                    quantity
                };
            })

            return this.dao.insert(cid, { _id: cid, products: newProducts });
        } catch (error) {
            throw error;
        }
    };

    async delete(carId) {
        try {
            await this.dao.getOne(carId);

            const { id } = await this.dao.getOne(carId);
            return this.dao.delete(carId, { _id: id, products: [] });
        } catch (error) {
            throw error;
        }
    };

    async deleteItem(cid, pid) {
        try {
            const productManager = new ProductManager();
            await productManager.getOne(pid);

            await this.getOne(cid);


            const { id, products } = await this.dao.getOne(cid);

            const newProducts = products.map(item => {
                const { id, ...rest } = item;
                if (item.id.toString() !== pid) {
                    return {
                        _id: id,
                        ...rest
                    }
                }
                return {
                    _id: id,
                    ...rest
                }
            });

            return this.dao.deleteItem(cid, { _id: id, products: newProducts });
        } catch (error) {
            throw error;
        }
    };

    async updateItem({ quantity }, cid, pid) {
        try {
            const productManager = new ProductManager();
            await this.getOne(cid);
            await productManager.getOne(pid);

            const { products } = await this.dao.getOne(cid);
            const arrProducts = products.map(item => {
                const { id, ...rest } = item;
                if (item.id.toString() === pid) {
                    rest.quantity = quantity
                    return {
                        _id: id,
                        ...rest
                    };
                }
                return {
                    _id: id,
                    ...rest
                };
            });

            return this.dao.updateItem(cid, { _id: cid, products: arrProducts });
        } catch (error) {
            throw error;
        }
    };

    async updateProducts(cid, { products }) {
        try {
            await this.getOne(cid);

            const productManager = new ProductManager();

            for (const item of products) {
                await productManager.getOne(item.id);
            }

            const { id } = await this.dao.getOne(cid);
            return this.dao.updateProducts(cid, { _id: id, products });
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;