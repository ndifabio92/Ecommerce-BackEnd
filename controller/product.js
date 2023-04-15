import {request, response} from "express";
import Product from "../models/productManager.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const {limit} = req.query;
        const result = await Product.find().limit(Number(limit));
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await Product.findById(pid);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const postProduct = async (req = request, res = response) => {
    try {
        const {body} = req;
        const product = new Product(body);
        await product.save();
        res.status(201).send({msg: "Producto creado", product});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const putProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const {_id, ...rest} = req.body;
        const result = await Product.findByIdAndUpdate(pid, rest, {new: true});
        res.send({msg: "Producto actualizado", result});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await Product.findByIdAndDelete(pid, {new: true});
        res.send({msg: "Producto eliminado", result});
    } catch (error) {
        res.status(500).send(error);
    }
}