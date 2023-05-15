import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { login, logout } from "../controller/session.js";

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').trim().notEmpty().escape().isEmail(),
    check('password', 'El password es obligatorio').trim().notEmpty().escape(),
    inputsValidation
], login);

router.post('/logout', logout);

export default router;