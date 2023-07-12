import container from "../../container.js";

class UserManager {

    constructor() {
        this.repository = container.resolve('UserRepository');
    }

    async getOne(email) {
        try {
            const userExist = await this.repository.getOne(email);
            if (userExist) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return userExist;
        } catch (error) {
            throw error;
        }
    };

    async create(user) {
        try {
            await this.getOne(user.email);
            return this.repository.create(user);
        } catch (error) {
            throw error;
        }
    };

    async userValidate(email) {
        try {
            const validate = await this.repository.validateUser(email);
            if (!validate) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return validate;
        } catch (error) {
            throw error;
        }
    }
}

export default UserManager;