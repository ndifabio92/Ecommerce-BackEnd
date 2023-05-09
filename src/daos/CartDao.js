import Cart from "../models/cartSchema.js";

class CartDao {

    async getOne(id) {
        try {
            const document = await Cart.findById(id).populate('products._id');

            if (!document) return null;
            return {
                id: document._id,
                products: document.products.map(item => {
                    const { _id: product } = item;
                    return {
                        id: product._id,
                        quantity: item.quantity,
                        title: product.title,
                        description: product.description,
                        code: product.code,
                        price: product.price,
                        status: product.status,
                        stock: product.stock,
                        category: product.category,
                        thumbnail: product.thumbnail,
                    }
                }),

            }
        } catch (error) {
            throw error;
        }
    };

    async create(data) {
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
            throw error;
        }
    };

    async insert(cid, body) {
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
            throw error;
        }
    };

    async delete(id, cart) {
        try {
            const document = await Cart.findByIdAndUpdate({ _id: id }, cart, { new: true });
            return {
                id: document._id
            }
        } catch (error) {
            throw error;
        }
    };

    async deleteItem(cid, newProducts) {
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

    async updateItem(cid, cart) {
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
            throw error;
        }
    };

    async updateProducts(cid, body) {
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
            throw error;
        }
    };
}

export default CartDao;