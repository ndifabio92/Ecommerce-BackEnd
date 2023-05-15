
import UserManager from "./UserManager.js";

class SessionManager {
    constructor() { }

    async login(user) {
        try {
            const manager = new UserManager();
            const validate = await manager.userValidate(user);
            return validate;
        } catch (error) {
            throw error;
        }
    }
}
export default SessionManager;