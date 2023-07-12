import Product from "./Product.js";

class Cart {
    constructor(props) {
        this.id = props.id;
        this.products = props.products.map(item => new Product({
            id: item.id._id,
            quantity: item.id.quantity,
            title: item.id.title,
            description: item.id.description,
            code: item.id.code,
            price: item.id.price,
            status: item.id.status,
            stock: item.id.stock,
            category: item.id.category,
            thumbnail: item.id.thumbnail
        }));
    }
}

export default Cart;