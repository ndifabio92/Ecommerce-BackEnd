import {request, response} from "express";
import ShoppingCartManager from "../models/shoppingCartManager.js";

const shoppingCart = new ShoppingCartManager();

export const getCartById = async (req = request, res = response) => {
    try {
        const {cid} = req.params;
        const data = await shoppingCart.getProductByShoppingCartId(Number(cid));
        res.send(data);
    } catch (error) {
        res.status(404).send(error);
    }
};

export const postCart = async (req = request, res = response) => {
    try {
        const {body} = req;
        await shoppingCart.createFile();
        const result = await shoppingCart.addCart(body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const postProductByCartId = async (req = request, res = response) => {
    try {
        const {cid, pid} = req.params;
        const result = await shoppingCart.addProductToCartById(Number(cid), Number(pid))
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}