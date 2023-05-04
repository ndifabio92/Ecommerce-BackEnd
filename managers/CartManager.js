import CartDao from "../daos/CartDao.js";

class CartManager {

    constructor() {
        this.dao = new CartDao();
    };

    async getOne(id) {
        try {
            return this.dao.getOne(id);
        } catch (error) {
            throw error;
        }
    };

    async create(data) {
        try {
            return this.dao.create(data);
        } catch (error) {
            throw error;
        }
    };

    async insert(id, product) {
        try {
            return this.dao.insert(id, product);
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            return this.dao.delete(id);
        } catch (error) {
            throw error;
        }
    };

    async deleteItem(cid, pid) {
        try {
            return this.dao.deleteItem(cid, pid);
        } catch (error) {
            throw error;
        }
    };

    async updateItem(item, cid, pid) {
        try {
            return this.dao.updateItem(item, cid, pid);
        } catch (error) {
            throw error;
        }
    };

    async updateProducts(item, cid) {
        try {
            return this.dao.updateProducts(item, cid);
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;