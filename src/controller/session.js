
import { request, response } from "express";
import SessionManager from "../managers/SessionManager.js";

export const login = async (req = request, res = response) => {
    try {
        const { body } = req;
        const manager = new SessionManager();
        const user = await manager.login(body, req);

        req.session.user = user;
        res.send({ status: "success", message: "login exitoso", user });
    } catch (error) {
        res.status(500).send({ error: error.massage });
    }
}


export const logout = async (req = request, res = response) => {
    try {
        await new Promise((resolve, reject) => {
            req.session.destroy(error => {
                error ? reject(error) : resolve();
                reject(error);
            });
        });

        return res.status(200).send({ status: 'success', message: "logout exitoso" });

    } catch (error) {
        res.status(500).send({ error: error.massage });
    }
}