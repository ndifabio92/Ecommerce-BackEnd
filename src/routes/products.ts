import { Router } from "express";
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from "../controller/products.js";

const router: Router = Router();

router.get('/', getProducts);

router.get('/:pid', getProductById);

router.post('/', postProduct);

router.put('/:pid', putProduct);

router.delete('/:pid', deleteProduct);


export default router;