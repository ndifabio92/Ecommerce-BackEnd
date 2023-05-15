
import UserManager from "./UserManager.js";

class SessionManager {
    constructor() { }

    async login(user) {
        const manager = new UserManager();
        const validate = await manager.userValidate(user);
        return validate;
    }
}
export default SessionManager;