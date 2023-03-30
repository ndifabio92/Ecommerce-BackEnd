import { Router } from "express";
import ShoppingCart from "../controller/shoppingCart.js";

const shoppingCart = new ShoppingCart();
const router = Router();

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const data = await shoppingCart.getProductByShoppingCartId(Number(cid));
        res.send(data);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        await shoppingCart.createFile();
        const result = await shoppingCart.addCart(body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await shoppingCart.addProductToCartById(Number(cid), Number(pid))
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;