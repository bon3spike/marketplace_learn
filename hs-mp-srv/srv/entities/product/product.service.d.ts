import { Repository } from 'typeorm';
import { Product } from './product.entity';
export type CreateProductDto = {
    title: string;
    description?: string | null;
    price: number | string;
    priceDiscounted?: number | string | null;
    image?: string | null;
};
export type UpdateProductDto = Partial<CreateProductDto>;
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    private normalizeNumber;
    private normalizeNullableNumber;
    getAllProducts(): Promise<Product[]>;
    getProductData(id: number): Promise<Product>;
    createProduct(productData: CreateProductDto): Promise<Product>;
    updateProductData(id: number, body: UpdateProductDto): Promise<Product>;
    deleteProductData(id: number): Promise<void>;
}
