import {generateToken, isValidPassword} from "../../shared/sessionShared.js";
import UserManager from "./UserManager.js";

class SessionManager {
    constructor() { }

    async login(body) {
        try {

            const { email, password } = body;
            const manager = new UserManager();
            const user = await manager.userValidate(email);

            const isHashedPassword = await isValidPassword(password, user.password);
            if (!isHashedPassword) {
                throw new Error("Login failed, invalid password.");
            }

            return await generateToken(user);
        } catch (error) {
            throw error;
        }
    }
}

export default SessionManager;