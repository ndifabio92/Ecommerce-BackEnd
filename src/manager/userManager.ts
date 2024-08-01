import UserDao from "../dao/userDao";
import IUser from "../interface/IUser";

class UserManager {

    private dao: UserDao;

    constructor() {
        this.dao = new UserDao();
    }

    async getOne(email: string) {
        try {
            const userExist = await this.dao.getOne(email);
            if (userExist) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return userExist;
        } catch (error) {
            throw error;
        }
    };

    async create(user: IUser) {
        try {
            await this.getOne(user.email);
            return this.dao.create(user);
        } catch (error) {
            throw error;
        }
    };

    async userValidate(email: string) {
        try {
            const validate = await this.dao.validateUser(email);
            if (!validate) throw new Error(`El email ${email} ya se encuentra registrado.`);

            return validate;
        } catch (error) {
            throw error;
        }
    }
}

export default UserManager;