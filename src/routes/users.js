import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { postUser } from "../controller/user.js";


const router = Router();

router.post('/', [
    check('firstName', 'El nombre es obligatorio').trim().notEmpty().escape(),
    check('lastName', 'El apellido es obligatorio').trim().notEmpty().escape(),
    check('email', 'El email es obligatorio').trim().notEmpty().escape().isEmail(),
    check('age', "La edad es obligatoria").trim().notEmpty().escape(),
    check('password', "La password es obligatoria").trim().notEmpty().escape(),
    inputsValidation
], postUser);

export default router;