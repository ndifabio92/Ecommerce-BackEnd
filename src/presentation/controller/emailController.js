import {request, response} from "express";
import EmailManager from "../../domain/managers/EmailManager.js";

export const send = async (req = request, res = response) => {
    try {
        const manager = new EmailManager();
        await manager.send();
        res.status(201).send({status: 'success'});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};