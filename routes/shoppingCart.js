import { Router } from "express";
import { getCartById, postCart, postProductByCartId } from "../controller/shoppingCart.js";

const router = Router();

router.get('/:cid', getCartById);

router.post('/', postCart);

router.post('/:cid/product/:pid', postProductByCartId)

export default router;