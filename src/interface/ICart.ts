import ProductCartItem from "../types/productCartItem.js";


interface ICart {
    _id?: string;
    id?: string;
    products: ProductCartItem[] | [];
}

export default ICart;