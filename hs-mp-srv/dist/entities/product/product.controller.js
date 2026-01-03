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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const storagePaths_1 = require("../../consts/storagePaths");
const fileUploader_1 = require("../../helpers/fileUploader");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProducts() {
        const products = await this.productService.getAllProducts();
        return {
            status: 'ok',
            data: products,
        };
    }
    async getProduct(id) {
        const product = await this.productService.getProductData(id);
        return { status: 'ok', data: product };
    }
    async createProduct(body, query, image) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const safeBody = Object.assign(Object.assign({}, (query !== null && query !== void 0 ? query : {})), (body !== null && body !== void 0 ? body : {}));
        const stringImage = (_a = image === null || image === void 0 ? void 0 : image.filename) !== null && _a !== void 0 ? _a : ((safeBody === null || safeBody === void 0 ? void 0 : safeBody.image) ? String(safeBody.image) : null);
        const payload = {
            title: (_c = (_b = safeBody.title) !== null && _b !== void 0 ? _b : safeBody.file) !== null && _c !== void 0 ? _c : null,
            description: (_d = safeBody.description) !== null && _d !== void 0 ? _d : null,
            price: (_e = safeBody.price) !== null && _e !== void 0 ? _e : null,
            priceDiscounted: (_h = (_g = (_f = safeBody.priceDiscounted) !== null && _f !== void 0 ? _f : safeBody.priceDiscounter) !== null && _g !== void 0 ? _g : safeBody.price_discounted) !== null && _h !== void 0 ? _h : null,
            image: stringImage,
        };
        if (!payload.title || payload.price === null || payload.price === undefined) {
            throw new common_1.BadRequestException('title and price are required');
        }
        const product = await this.productService.createProduct(payload);
        return { status: 'ok', data: product };
    }
    async updateProduct(id, body) {
        const product = await this.productService.updateProductData(id, body);
        return { status: 'ok', data: product };
    }
    async deleteProduct(id) {
        await this.productService.deleteProductData(id);
        return { status: 'ok' };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                (0, fileUploader_1.ensureProductImagesDir)();
                cb(null, storagePaths_1.PRODUCTS_IMAGES_FOLDER_PATH);
            },
            filename: (_req, file, cb) => {
                const safe = (0, fileUploader_1.makeSafeFilename)(file.originalname);
                cb(null, safe);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)({ path: 'products' }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
