import { Router } from "express";
import { getCartById, postCart, postProductByCartId, deleteCart, deleteItem, putProductByCartId, putProductsByCartId } from "../controller/carts";

const router: Router = Router();

router.get('/:cid', getCartById);

router.post('/', postCart);

router.post('/:cid/product/:pid', postProductByCartId);

router.delete('/:cid', deleteCart);

router.delete('/:cid/product/:pid', deleteItem);

router.put('/:cid', putProductsByCartId);

router.put('/:cid/product/:pid', putProductByCartId);


export default router;