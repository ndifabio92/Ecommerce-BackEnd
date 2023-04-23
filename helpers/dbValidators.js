import Product from "../models/productManager.js";
import Cart from "../models/shoppingCartManager.js";

export const codeExist = async (code = "") => {
    try {
        const isExist = await Product.findOne({ code });
        if (isExist) throw new Error(`El codigo ${code} ya existe`);
    } catch (error) {
        throw error;
    }
};

export const productExist = async (_id = "") => {
    try {
        const isExist = await Product.findById({ _id });
        if (!isExist) throw new Error(`El producto con el id ${_id} no existe`);
    } catch (error) {
        throw error;
    }
};

export const cartExist = async (_id = "") => {
    try {
        const isExist = await Cart.findById({ _id });
        if (!isExist) throw new Error(`El carrito de compra con el id ${_id} no existe`);
    } catch (error) {
        throw error;
    }
};