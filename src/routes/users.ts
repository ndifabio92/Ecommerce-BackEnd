import { Router } from "express";
import { postUser } from "../controller/users.js";

const router: Router = Router();

router.post('/', postUser);

export default router;