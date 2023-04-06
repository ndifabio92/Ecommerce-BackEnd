import {request, response} from "express";
import ProductManager from "../models/productManager.js";

const productManager = new ProductManager();

export const getProducts = async (req = request, res = response) => {
    try {
        const {limit} = req.query;
        const data = await productManager.getProducts();
        const result = limit ? data.slice(0, Number(limit)) : data;
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await productManager.getProductById(Number(pid));
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
};

export const postProduct = async (req = request, res = response) => {
    try {
        const {body} = req;
        await productManager.createFile();
        const result = await productManager.addProduct(body);
        const io = req.app.get("io");
        io.emit('productCreated', result.product);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const putProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const {body} = req;
        const result = await productManager.updateProductById(body, Number(pid));
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await productManager.deleteProductById(Number(pid));
        const io = req.app.get("io");
        io.emit("productRemoved", pid);
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
}