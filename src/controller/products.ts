import { Request, Response } from "express";
import ProductManager from "../manager/productManager";
import ProductDTO from "../dto/productDTO";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        // const paginate = req.query;
        // const manager = new ProductManager();
        // const result = await manager.getAll(paginate);
        // res.send({ status: "success", ...result });
        res.send("no esta resuelto el problema del paginator");
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pid } = req.params;
        const manager = new ProductManager();
        const result = await manager.getOne(pid);
        res.send(result);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

export const postProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req;
        const manager = new ProductManager();
        const result = await manager.create(body);
        res.status(201).send({ msg: "Producto creado", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const putProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pid } = req.params;
        const { id, ...rest } = req.body;
        const manager = new ProductManager();
        const result = await manager.update(pid, rest);

        res.send({ msg: "Producto actualizado", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pid  } = req.params;
        const manager: ProductManager = new ProductManager();
        const result: ProductDTO = await manager.delete(pid);

        res.send({ msg: "Producto eliminado", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}