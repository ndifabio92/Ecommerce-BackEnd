import ProductSchema from "../models/productSchema.js";
import ProductEntity from "../../domain/entities/ProductEntity.js";

class ProductRepository {
    async getAll(filters, options) {
        try {
            const {docs, ...pagination} = await ProductSchema.paginate(filters, options);
            const products = docs.map(item => new ProductEntity({
                id: item._id,
                title: item.title,
                description: item.description,
                code: item.code,
                price: item.price,
                status: item.status,
                stock: item.stock,
                category: item.category,
                thumbnail: item.thumbnail
            }));

            return {
                products,
                ...pagination
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(id) {
        try {
            const document = await ProductSchema.findById(id).where({status: true});
            if (!document) return null;

            return new ProductEntity({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOneCode(code) {
        try {
            const document = await ProductSchema.findOne({code}, {status: true});
            if (!document) return null;
            return new ProductEntity({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(data) {
        try {
            const document = await ProductSchema.create(data);
            return new ProductEntity({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, body) {
        try {
            const document = await ProductSchema.findByIdAndUpdate(id, body, {new: true});
            return new ProductEntity({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const document = await ProductSchema.findByIdAndUpdate(id, {status: false}, {new: true});
            return new ProductEntity({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ProductRepository;