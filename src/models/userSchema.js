import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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
