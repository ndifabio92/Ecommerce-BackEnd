import {Router} from "express";
import {check} from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import {codeExist, productExist} from "../helpers/dbValidators.js";
import {getProducts, getProductById, postProduct, putProduct, deleteProduct} from "../controller/product.js";

const router = Router();

router.get('/', getProducts);

router.get('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist),
    inputsValidation
], getProductById);

router.post('/', [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('description', 'La descripcion es obligatorio').notEmpty(),
    check('code', 'El codigo es obligatorio').notEmpty().custom(codeExist),
    check('stock', 'El stock es obligatorio').notEmpty(),
    check('category', 'La categoria es obligatorio').notEmpty(),
    inputsValidation
], postProduct);

router.put('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist),
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('description', 'La descripcion es obligatorio').notEmpty(),
    check('code', 'El codigo es obligatorio').notEmpty().custom(codeExist),
    check('stock', 'El stock es obligatorio').notEmpty(),
    check('category', 'La categoria es obligatorio').notEmpty(),
    inputsValidation
], putProduct);

router.delete('/:pid', [
    check('pid', 'No es un id valido').isMongoId(),
    check('pid').custom(productExist),
    inputsValidation
], deleteProduct);

export default router;