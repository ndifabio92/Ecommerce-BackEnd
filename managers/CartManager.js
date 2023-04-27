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
    }
}

export default CartManager;