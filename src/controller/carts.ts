import { Request, Response } from "express";
import CartManager from "../manager/cartManager";


export const getCartById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.getOne(cid);
        res.send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

export const postCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req;
        const manager = new CartManager();
        const result = await manager.create(body)
        res.status(201).send({ msg: "Carrito de compra creado", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const postProductByCartId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.insert(cid, pid);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.delete(cid);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.deleteItem(cid, pid);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const putProductByCartId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req;
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.updateItem(body, cid, pid);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const putProductsByCartId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req;
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.updateProducts(cid, body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}