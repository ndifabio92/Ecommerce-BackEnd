import { Router } from "express";
import { login, logout } from "../controller/session.js";

const router: Router = Router();

router.post('/login', login);

router.post('/logout', logout);

export default router;