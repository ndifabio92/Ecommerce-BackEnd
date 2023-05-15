import UserDao from "../daos/UserDao.js";

class UserManager {

    constructor() {
        this.dao = new UserDao();
    }

    async getOne(email) {
        try {
            const userExist = await this.dao.getOne(email);
            if (userExist) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return userExist;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async create(user) {
        try {
            await this.getOne(user.email);
            return this.dao.create(user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async userValidate(user) {
        try {
            const validate = await this.dao.validateUser(user);
            if (!validate) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return validate;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserManager;