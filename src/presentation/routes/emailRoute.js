import {Router} from "express";
import {send} from "../controller/emailController.js";

const router = Router();

router.post('/', send);

export default router;