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

    async insert(cid, pid) {
        try {
            const updateProducts = await cartSchema.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                { new: true }
            );

            if (!updateProducts) {
                await cartSchema.updateOne(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                );
            };

            const document = await cartSchema.findById(cid);

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