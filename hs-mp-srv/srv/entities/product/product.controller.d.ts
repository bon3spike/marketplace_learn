import { ProductService, CreateProductDto, UpdateProductDto } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(): Promise<{
        status: string;
        data: import("./product.entity").Product[];
    }>;
    getProduct(id: number): Promise<{
        status: string;
        data: import("./product.entity").Product;
    }>;
    createProduct(body: CreateProductDto | undefined, query: Record<string, any>, image?: any): Promise<{
        status: string;
        data: import("./product.entity").Product;
    }>;
    updateProduct(id: number, body: UpdateProductDto): Promise<{
        status: string;
        data: import("./product.entity").Product;
    }>;
    deleteProduct(id: number): Promise<{
        status: string;
    }>;
}
