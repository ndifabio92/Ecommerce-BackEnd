import ProductDao from "../daos/ProductDao.js";

class ProductManager {

    constructor() {
        this.dao = new ProductDao();
    };

    async getAll(limit) {
        try {
            return this.dao.getAll(limit);
        } catch (error) {
            throw error;
        }
    };

    async getOne(id) {
        try {
            return this.dao.getOne(id);
        } catch (error) {
            throw error;
        }
    };

    async getOneCode(code) {
        try {
            return this.dao.getOneCode(code);
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

    async update(id, body) {
        try {
            return this.dao.update(id, body, { new: true });
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            return this.dao.delete(id, { status: false }, { new: true });
        } catch (error) {
            throw error;
        }
    };
}

export default ProductManager;