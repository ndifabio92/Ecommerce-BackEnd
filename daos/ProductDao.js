import productSchema from "../models/productSchema.js";

class ProductDao {
    async getAll(limit) {
        try {
            const document = await productSchema.find({ status: true }).limit(limit);
            return document.map(item => ({
                id: item._id,
                title: item.title,
                description: item.description,
                code: item.code,
                price: item.price,
                status: item.status,
                stock: item.stock,
                category: item.category,
                thumbnail: item?.thumbnail
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(id) {
        try {
            const document = await productSchema.findById(id).where({ status: true });
            if (!document) return null;

            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document?.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOneCode(code) {
        try {
            const document = await productSchema.find({ code }, { status: true });
            if (document.length === 0) return null;
            return {
                id: document[0]._id,
                title: document[0].title,
                description: document[0].description,
                code: document[0].code,
                price: document[0].price,
                status: document[0].status,
                stock: document[0].stock,
                category: document[0].category,
                thumbnail: document[0]?.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(data) {
        try {
            const document = await productSchema.create(data);
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document?.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, body) {
        try {
            const document = await productSchema.findByIdAndUpdate(id, body, { new: true });
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document?.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const document = await productSchema.findByIdAndUpdate(id, { status: false }, { new: true });
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document?.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ProductDao;