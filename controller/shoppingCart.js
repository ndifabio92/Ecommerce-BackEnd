import {request, response} from "express";
import Cart from "../models/shoppingCartManager.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const {cid} = req.params;
        const result = await Cart.findById(cid);
        res.send(result);
    } catch (error) {
        res.status(404).send({error: error.message});
    }
};

export const postCart = async (req = request, res = response) => {
    try {
        const {body} = req;
        const cart = new Cart(body);
        await cart.save();
        res.send({msg: "Carrito de compra creado", cart});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

export const postProductByCartId = async (req = request, res = response) => {
    try {
        const {cid, pid} = req.params;
        const cart = await Cart.findById(cid);
        const product = cart.products.find(item => item.id === pid);
        product ? product.quantity += 1 : cart.products = [...cart.products, {_id: pid, quantity: 1}];
        // const result = await shoppingCart.addProductToCartById(Number(cid), Number(pid));
        const result = await Cart.findByIdAndUpdate(cid, cart, {new: true});
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};