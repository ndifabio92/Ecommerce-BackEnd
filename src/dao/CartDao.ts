import ICart from "../interface/ICart";
import Cart from "../model/cartSchema";
import ProductCartItem from "../types/productCartItem";
import IProduct from "../interface/IProduct";


class CartDao {

    async getOne(id: string) {
        try {
            const document = await Cart.findById(id).populate('products._id');

            if (!document) return null;
            return {
                id: document._id,
                products: document.products.map(item => {

                    const {_id: documentProduct} = item;
                    return {
                        id: documentProduct._id,
                        quantity: item.quantity,
                        title: documentProduct.title,
                        description: documentProduct.description,
                        code: documentProduct.code,
                        price: documentProduct.price,
                        status: documentProduct.status,
                        stock: documentProduct.stock,
                        category: documentProduct.category,
                        thumbnail: documentProduct.thumbnail,
                    }
                }),

            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async create(data: ICart) {
        try {
            const document = await Cart.create(data);
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async insert(cid: string, body: ICart) {
        try {
            const document = await Cart.findOneAndUpdate({ _id: cid }, body, { new: true });

            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async delete(id: string, cart: ICart) {
        try {
            const document = await Cart.findByIdAndUpdate({ _id: id }, cart, { new: true });
            return {
                id: document._id
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async deleteItem(cid: string, newProducts: ICart) {
        try {
            const document = await Cart.findByIdAndUpdate({ _id: cid }, newProducts, { new: true });
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            };
        } catch (error) {
            throw error;
        }
    };

    async updateItem(cid: string, cart: ICart) {
        try {
            const document = await Cart.findByIdAndUpdate({ _id: cid }, cart, { new: true })
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async updateProducts(cid: string, body: ICart) {
        try {
            const document = await Cart.findByIdAndUpdate({ _id: cid }, body, { new: true });
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}

export default CartDao;