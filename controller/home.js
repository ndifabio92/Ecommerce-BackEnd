import { request, response } from "express";
import ProductManager from "../models/productManager.js";

export const getHome = async (req= request, res= response) => {
    try {
        const product = new ProductManager();
        const listProducts = await  product.getProducts();
        res.render('homeView', { title: 'Lista de Productos', listProducts})
    } catch (error) {
        res.status(404).send(error);
    }
}