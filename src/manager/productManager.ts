import ProductDao from "../dao/productDao";
import ProductDTO from "../dto/productDTO";
import IProduct from "../interface/IProduct";
import typeId from "../types/typeId";

class ProductManager {

    private dao: ProductDao;

    constructor() {
        this.dao = new ProductDao();
    }

    // async getAll(paginate): Promise<ProductDTO> {
    //     try {
    //         const { limit = 10, page = 1, sort, query } = paginate;
    //         const options = {
    //             limit,
    //             page,
    //             sort: sort && { price: sort.toUpperCase() ? 1 : -1 },
    //         };

    //         const params = query?.split(':');

    //         const filters = {
    //             status: true,
    //             [params?.type]: params?.value
    //         };

    //         return this.dao.getAll(filters, options);
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    async getOne(id: typeId): Promise<ProductDTO> {
        try {
            const product = await this.dao.getOne(id);
            if (!product) throw new Error(`El producto con el id ${id} no existe o se encuentra eliminado`);

            return product;
        } catch (error) {
            throw error;
        }
    };

    async getOneCode(code: string): Promise<ProductDTO> {
        try {
            return await this.dao.getOneCode(code);
        } catch (error) {
            throw error;
        }
    };

    async create(body: IProduct): Promise<ProductDTO> {
        try {
            const codeExist = await this.getOneCode(body.code);
            if (codeExist) {
                if (codeExist?.id.toString() !== body.id) throw new Error("El codigo ingresado ya esta siendo utilizado por otro producto");
            };
            return this.dao.create(body);
        } catch (error) {
            throw error;
        }
    };

    async update(id: string, body: IProduct): Promise<ProductDTO> {
        try {
            await this.getOne(id);

            const codeExist = await this.getOneCode(body.code);
            if (codeExist) {
                if (codeExist?.id.toString() !== id) throw new Error("El codigo ingresado ya esta siendo utilizado por otro producto");
            };

            return this.dao.update(id, body);
        } catch (error) {
            throw error;
        }
    };

    async delete(id: string): Promise<ProductDTO> {
        try {
            await this.getOne(id);

            return this.dao.delete(id);
        } catch (error) {
            throw error;
        }
    };
}

export default ProductManager;