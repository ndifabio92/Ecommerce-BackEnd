import cartSchema from "../models/cartSchema.js";

class CartDao {

    async getOne(id) {
        try {
            const document = await cartSchema.findById(id);
            if (!document) return null;
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

    async create(data) {
        try {
            const document = await cartSchema.create(data);
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

    async insert(id, cart) {
        try {
            const document = await cartSchema.findByIdAndUpdate(id, {
                $set: {
                    products: cart
                }
            }, { new: true });
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
    }
}

export default CartDao;