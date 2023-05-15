import { request, response } from "express";
import UserManager from "../managers/UserManager.js";

export const postUser = async (req = request, res = response) => {
    try {
        const { body } = req;
        const manager = new UserManager();
        const result = await manager.create(body);
        res.send({ status: "sucess", msg: "Usuario creado", result });

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}