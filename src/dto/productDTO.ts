interface ProductDTO {
    id: string;
    title: string;
    description: string;
    code: string;
    price: number;
    status: boolean;
    stock: number;
    category: string;
    thumbnail: string[];
}

export default ProductDTO;