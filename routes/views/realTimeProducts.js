import {Router} from "express";
import {realTimeProducts} from "../../controller/views/realTimeProducts.js";

const router = new Router();

router.get('/', realTimeProducts);

export default router;