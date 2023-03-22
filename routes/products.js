import { Router } from "express";
import ProductManager from "../controller/ProductManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/products', async (req, res) => {
    const { limit } = req.query;
    const data = await productManager.getProducts();
    const result = limit ? data.slice(0, Number(limit)) : data;

    res.send(result)
});

router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const data = await productManager.getProductById(Number(pid));
    res.send(data);
})

export default router;