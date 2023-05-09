import Product from "../models/productSchema.js";

const SORTVALUE = {
    'asc': 1,
    'desc': -1
};
class ProductDao {
    async getAll(paginate) {
        try {
            const { limit = 10, page = 1, sort, query } = paginate;
            const options = {
                limit,
                page,
                sort: sort && { price: SORTVALUE[sort] },
            };

            const filters = {
                status: true,
                filter: query && { filter: { query } }
            };

            const { docs, ...rest } = await Product.paginate(filters, options)
            const dto = docs.map(item => ({
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

            return { payload: dto, ...rest };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(id) {
        try {
            const document = await Product.findById(id).where({ status: true });
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
                thumbnail: document.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOneCode(code) {
        try {
            const document = await Product.findOne({ code }, { status: true });
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
                thumbnail: document.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(data) {
        try {
            const document = await Product.create(data);
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, body) {
        try {
            const document = await Product.findByIdAndUpdate(id, body, { new: true });
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const document = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
            return {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ProductDao;