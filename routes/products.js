import {Router} from "express";
import {getProducts, getProductById, postProduct, putProduct, deleteProduct} from "../controller/product.js";

const router = Router();

router.get('/', getProducts);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProduct);

router.delete('/:pid', deleteProduct)

export default router;