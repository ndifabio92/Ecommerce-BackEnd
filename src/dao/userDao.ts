import IUser from "../interface/IUser";
import UserSchema from "../model/userSchema";

class UserDao {
    async getOne(email: string) {
        try {
            const document = await UserSchema.findOne({ email });
            if (!document) return null;

            const { _id, __v, ...rest } = document;
            return {
                id: _id,
                ...rest
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(user: IUser) {
        try {
            const document = await UserSchema.create(user);
            const { _id } = document;
            return {
                id: _id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async validateUser(email: string) {
        try {
            const document = await UserSchema.findOne({ email });

            if (!document) return null;
            return {
                id: document._id,
                password: document.password,
                email: document.email
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserDao;