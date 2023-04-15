import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatorio'],
    },
    code: {
        type: String,
        required: [true, 'El codigo es obligatorio'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: [true, "El stock es obligatorio modelo"],
    },
    category: {
        type: String,
        required: [true, 'La category es obligatorio'],
    },
    thumbnail: {
        type: [String],
    }

});

export default model('Product', ProductSchema);