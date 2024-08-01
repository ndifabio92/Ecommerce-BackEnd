import { Schema, Document, model, Model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import IProduct from "../interface/IProduct";

const ProductSchema = new Schema<IProduct>({
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

ProductSchema.plugin(paginate);

const ProductModel: Model<IProduct & Document> = model<IProduct & Document>("Product", ProductSchema);

export default ProductModel;

