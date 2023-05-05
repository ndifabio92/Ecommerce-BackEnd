import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";

export const codeExist = async (code = "") => {
    try {
        const manager = new ProductManager();
        const isExist = await manager.getOneCode(code);
        if (isExist) throw new Error(`El codigo ${code} ya existe`);
    } catch (error) {
        throw error;
    }
};

export const productExist = async (id = "") => {
    try {
        const manager = new ProductManager();
        const isExist = await manager.getOne(id);
        if (!isExist) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);
    } catch (error) {
        throw error;
    }
};

export const cartExist = async (id = "") => {
    try {
        const manager = new CartManager();
        const isExist = await manager.getOne(id);
        if (!isExist) throw new Error(`El carrito de compra con el id ${id} no existe`);
    } catch (error) {
        throw error;
    }
};