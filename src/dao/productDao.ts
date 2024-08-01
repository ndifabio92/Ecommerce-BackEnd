
import IProduct from '../interface/IProduct';
import ProductSchema from '../model/productSchema';
import ProductDTO from '../dto/productDTO';
import typeId from "../types/typeId";

class ProductDao {
    async getAll() {
        try {
            // const { docs, ...rest } = await ProductModel.paginate({});
            // const dto = docs.map((item: IProduct) => ({
            //     id: item._id,
            //     title: item.title,
            //     description: item.description,
            //     code: item.code,
            //     price: item.price,
            //     status: item.status,
            //     stock: item.stock,
            //     category: item.category,
            //     thumbnail: item.thumbnail
            // }));

            // return { payload: dto, ...rest };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(id: typeId): Promise<ProductDTO> {
        try {
            const document = await ProductSchema.findById(id).where({ status: true });
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

    async getOneCode(code: string): Promise<ProductDTO> {
        try {
            const document = await ProductSchema.findOne({ code }, { status: true });
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

    async create(data: IProduct): Promise<ProductDTO> {
        try {
            const document = await ProductSchema.create(data);
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

    async update(id: string, body: IProduct): Promise<ProductDTO> {
        try {
            const document = await ProductSchema.findByIdAndUpdate(id, body, { new: true });
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

    async delete(id: string): Promise<ProductDTO> {
        try {
            const document = await ProductSchema.findByIdAndUpdate(id, { status: false }, { new: true });
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