import { Schema, model } from "mongoose";
import IUser from "../interface/IUser";

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, "El firstName es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true, "El lastName es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El emial es obligatorio"],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "El age es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    }
});

export default model('User', UserSchema);