import User from "../models/userSchema.js";

class UserDao {
    async getOne(email) {
        try {
            const document = await User.findOne({ email });
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

    async create(user) {
        try {
            const document = await User.create(user);
            const { _id, password, __v } = document;
            return {
                id: _id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.document,
                age: document.age
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async validateUser({ email, password }) {
        try {
            const document = await User.findOne({ email, password });

            if (!document) return null;
            return {
                id: document._id,
                email: document.email
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserDao;