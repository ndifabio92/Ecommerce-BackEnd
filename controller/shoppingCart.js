import { request, response } from "express";
import Cart from "../models/cartSchema.js";
import CartManager from "../managers/CartManager.js";
import { ObjectId } from "mongodb";

export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.getOne(cid);
        res.send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

export const postCart = async (req = request, res = response) => {
    try {
        const { body } = req;
        const manager = new CartManager();
        const result = await manager.create(body)
        res.status(201).send({ msg: "Carrito de compra creado", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const postProductByCartId = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.insert(cid, pid);

        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};