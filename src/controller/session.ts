import { Request, Response } from "express";
import SessionManager from "../manager/sessionManager";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {

        const manager = new SessionManager();
        const user = await manager.login(req.body);
        res.send({ status: "success", message: "login exitoso", user });

    } catch (error) {
        res.status(500).send({ error: error.massage });
    }
}


export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).send({ status: 'success', message: "logout exitoso" });

    } catch (error) {
        res.status(500).send({ error: error.massage });
    }
}