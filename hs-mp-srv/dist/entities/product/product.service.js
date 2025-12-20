"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    normalizeNumber(value) {
        if (value === undefined || value === null || value === '')
            return undefined;
        const n = Number(value);
        return Number.isFinite(n) ? n : undefined;
    }
    normalizeNullableNumber(value) {
        if (value === undefined)
            return undefined;
        if (value === null || value === '')
            return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : undefined;
    }
    async getAllProducts() {
        return this.productRepository.find();
    }
    async getProductData(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async createProduct(productData) {
        var _a, _b, _c;
        const payload = {
            title: productData.title,
            description: (_a = productData.description) !== null && _a !== void 0 ? _a : null,
            image: (_b = productData.image) !== null && _b !== void 0 ? _b : null,
            price: this.normalizeNumber(productData.price),
            priceDiscounted: (_c = this.normalizeNullableNumber(productData.priceDiscounted)) !== null && _c !== void 0 ? _c : null,
        };
        const newProduct = this.productRepository.create(payload);
        return this.productRepository.save(newProduct);
    }
    async updateProductData(id, body) {
        var _a, _b, _c;
        const existing = await this.getProductData(id);
        const payload = {
            title: (_a = body.title) !== null && _a !== void 0 ? _a : existing.title,
            description: (_b = body.description) !== null && _b !== void 0 ? _b : existing.description,
            image: (_c = body.image) !== null && _c !== void 0 ? _c : existing.image,
        };
        const price = this.normalizeNumber(body.price);
        if (price !== undefined) {
            payload.price = price;
        }
        const priceDiscounted = this.normalizeNullableNumber(body.priceDiscounted);
        if (priceDiscounted !== undefined) {
            payload.priceDiscounted = priceDiscounted;
        }
        const merged = this.productRepository.merge(existing, payload);
        return this.productRepository.save(merged);
    }
    async deleteProductData(id) {
        await this.productRepository.delete({ id });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product, 'hs_marketplace')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map