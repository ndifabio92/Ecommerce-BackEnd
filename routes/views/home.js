import {Router} from "express";
import {getHome} from "../../controller/views/home.js";

const router = new Router();

router.get('/', getHome);

export default router;