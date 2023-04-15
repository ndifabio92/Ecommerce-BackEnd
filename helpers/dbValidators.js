import Product from "../models/productManager.js";
import Cart from "../models/shoppingCartManager.js";

export const codeExist = async (code = "") => {
    const isExist = await Product.findOne({code});
    if (isExist) throw new Error(`El codigo ${code} ya existe`);
};

export const productExist = async (_id = "") => {
    const isExist = await Product.findById({_id});
    if (!isExist) throw new Error(`El producto con el id ${_id} no existe`);
};

export const cartExist = async (_id = "") => {
    const isExist = await Cart.findById({_id});
    if (!isExist) throw new Error(`El carrito de compra con el id ${_id} no existe`);
};