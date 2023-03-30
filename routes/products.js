import { Router } from "express";
import ProductManager from "../controller/productManager.js";

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

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        await productManager.createFile();
        const result = await productManager.addProduct(body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const { body } = req;
        const result = await productManager.updateProductById(body, Number(pid));
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await productManager.deleteProductById(Number(pid));
        res.send(result);
    } catch (error) {
        res.status(404).send(error);
    }
})

export default router;