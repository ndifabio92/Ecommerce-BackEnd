import { ObjectId } from "mongodb";
import { Schema, model, } from "mongoose";

const CartSchema = new Schema({
    products: {
        type: [{
            _id: {
                type: ObjectId,
                required: [true, "El id del producto es obligatorio"],
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: [true, "La cantidad es requerida"],
            },
        }],
        required: [true, "Al menos tiene que haber un producto"]
    }
});

export default model('Cart', CartSchema);