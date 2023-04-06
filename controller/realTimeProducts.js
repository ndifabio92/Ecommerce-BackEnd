import {request, response} from "express";
import ProductManager from "../models/productManager.js";

export const realTimeProducts = async (req = request, res = response) => {
    try {
        const product = new ProductManager();
        const listProducts = await product.getProducts();
        res.render('realTimeProducts', {title: "Real Time Products", listProducts});
    } catch (error) {
        res.status(404).send(error);
    }
}