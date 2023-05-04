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
                        thumbnail: product?.thumbnail,
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

    async insert(cid, pid) {
        try {
            let document = await Cart.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                { new: true }
            );

            if (!document) {
                document = await Cart.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                );
            };

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

    async delete(id) {
        try {
            const document = await Cart.findOneAndUpdate(
                { _id: id },
                { $unset: { products: true } },
                { new: true }
            );
            return {
                id: document._id
            }
        } catch (error) {
            throw error;
        }
    };

    async deleteItem(cid, pid) {
        try {
            const document = await Cart.findByIdAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            )

            return {
                id: document._id
            };
        } catch (error) {
            throw error;
        }
    };

    async updateItem(item, cid, pid) {
        try {
            const document = await Cart.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $set: { 'products.$.quantity': item.quantity } },
                { new: true }
            );
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

    async updateProducts(item, cid) {
        try {
            const document = await Cart.findOneAndUpdate(
                { _id: cid },
                { $set: { 'products': item.products } },
                { new: true }
            );
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