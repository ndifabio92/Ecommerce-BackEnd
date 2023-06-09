import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { getCartById, postCart, postProductByCartId, deleteCart, deleteItem, putProductByCartId, putProductsByCartId } from "../controller/shoppingCart.js";

const router = Router();

router.get('/:cid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    inputsValidation
], getCartById);

router.post('/', [
    check('products.*.id', "No es un id valido").isMongoId(),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], postCart);

router.post('/:cid/product/:pid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    check('products.*.id', "No es un id valido").isMongoId(),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], postProductByCartId);

router.delete('/:cid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    inputsValidation
], deleteCart);

router.delete('/:cid/product/:pid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    check('products.*._id', "No es un id valido").isMongoId(),
    inputsValidation,
], deleteItem);

router.put('/:cid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    check('products.*.id', "No es un id valido").isMongoId(),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], putProductsByCartId);

router.put('/:cid/product/:pid', [
    check('cid', 'No es un id valido').isMongoId(),
    check('cid').escape(),
    check('products.*.id', "No es un id valido").isMongoId(),
    check("products.*.quantity", "La cantidad es requerida").notEmpty(),
    check("products.*.quantity", "La cantidad tiene que ser mayor a 0").isInt({ min: 1 }),
    inputsValidation
], putProductByCartId);


export default router;