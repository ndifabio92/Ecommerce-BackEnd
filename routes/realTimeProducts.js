import {Router} from "express";
import {realTimeProducts} from "../controller/realTimeProducts.js";

const router = new Router();

router.get('/', realTimeProducts );

export default router;