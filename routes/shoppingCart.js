import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { productExist, cartExist } from "../helpers/dbValidators.js";
import { getCartById, postCart, postProductByCartId } from "../controller/shoppingCart.js";

const router = Router();

router.get('/:cid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').custom(cartExist),
    inputsValidation
], getCartById);

router.post('/', [
    check('products.*._id', "No es un id valido").isMongoId().custom(productExist),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], postCart);

router.post('/:cid/product/:pid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').custom(cartExist),
    check('products.*._id', "No es un id valido").isMongoId().custom(productExist),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], postProductByCartId)

export default router;