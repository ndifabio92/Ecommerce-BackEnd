import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const data = await productManager.getProducts();
        const result = limit ? data.slice(0, Number(limit)) : data;

        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const data = await productManager.getProductById(Number(pid));
        res.send(data);
    } catch (error) {
        res.status(404).send(error);
    }
});

export default router;