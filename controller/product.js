import {request, response} from "express";
import Product from "../models/productManager.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const {limit} = req.query;
        const result = await Product.find().limit(Number(limit));
        res.send(result);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

export const getProductById = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await Product.findById(pid);
        res.send(result);
    } catch (error) {
        res.status(404).send({error: error.message});
    }
};

export const postProduct = async (req = request, res = response) => {
    try {
        const {body} = req;
        const product = new Product(body);
        await product.save();
        res.status(201).send({msg: "Producto creado", product});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

export const putProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const {_id, ...rest} = req.body;

        const codeExist = await Product.findOne({code: rest.code});
        if (codeExist?._id.toString() !== pid) throw new Error("El codigo ingresado ya esta siendo utilizado por otro producto");

        const result = await Product.findByIdAndUpdate(pid, rest, {new: true});
        res.send({msg: "Producto actualizado", result});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params;
        const result = await Product.findByIdAndUpdate(pid, {status: false}, {new: true});
        res.send({msg: "Producto eliminado", result});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}