import UserSchema from "../models/userSchema.js";
import User from "../../domain/entities/User.js";

class UserRepository {
    async getOne(email) {
        try {
            const document = await UserSchema.findOne({email});
            if (!document) return null;

            const {_id, __v, ...rest} = document;
            return new User({
                id: _id,
                ...rest
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(user) {
        try {
            const document = await UserSchema.create(user);
            const {_id, password, __v} = document;
            return new User({
                id: _id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.document,
                age: document.age
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async validateUser(email) {
        try {
            const document = await UserSchema.findOne({email});

            if (!document) return null;
            return new User({
                id: document._id,
                password: document.password,
                email: document.email
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserRepository;