import ProductDao from "../daos/ProductDao.js";
import { productExist } from "../helpers/dbValidators.js";

class ProductManager {

    constructor() {
        this.dao = new ProductDao();
    };

    async getAll(paginate) {
        try {
            return this.dao.getAll(paginate);
        } catch (error) {
            throw error;
        }
    };

    async getOne(id) {
        try {
            const product = await this.dao.getOne(id);
            if (!product) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);

            return product;
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

    async create(body) {
        try {
            const codeExist = await this.dao.getOneCode(body.code);
            if (codeExist) {
                if (codeExist?.id.toString() !== body.id) throw new Error("El codigo ingresado ya esta siendo utilizado por otro producto");
            };
            return this.dao.create(body);
        } catch (error) {
            throw error;
        }
    };

    async update(id, body) {
        try {
            const productExist = await this.dao.getOne(id);
            if (!productExist) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);

            const codeExist = await this.dao.getOneCode(body.code);
            if (codeExist) {
                if (codeExist?.id.toString() !== id) throw new Error("El codigo ingresado ya esta siendo utilizado por otro producto");
            };

            return this.dao.update(id, body, { new: true });
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            const productExist = await this.dao.getOne(id);
            if (!productExist) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);

            return this.dao.delete(id, { status: false }, { new: true });
        } catch (error) {
            throw error;
        }
    };
}

export default ProductManager;