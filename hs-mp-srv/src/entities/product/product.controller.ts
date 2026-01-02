import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import type { Request } from 'express'

import { PRODUCTS_IMAGES_FOLDER_PATH } from '../../consts/storagePaths'
import { ensureProductImagesDir, makeSafeFilename } from '../../helpers/fileUploader'
import { ProductService } from './product.service'

@Controller({ path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @HttpCode(200)
  async getProducts() {
    const products = await this.productService.getAllProducts()
    return {
      status: 'ok',
      data: products,
    }
  }

  @Get('/:id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProductData(id)
    return { status: 'ok', data: product }
  }

  @Post('/')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (
          _req: Request,
          _file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void
        ) => {
          ensureProductImagesDir()
          cb(null, PRODUCTS_IMAGES_FOLDER_PATH)
        },
        filename: (
          _req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ) => {
          const safe = makeSafeFilename(file.originalname)
          cb(null, safe)
        },
      }),
    })
  )
  async createProduct(
    @Body() body: Record<string, any> | undefined,
    @Query() query: Record<string, any>,
    @UploadedFile() image?: Express.Multer.File
  ) {
    const safeBody = { ...(query ?? {}), ...(body ?? {}) }
    const stringImage = image?.filename ?? (safeBody?.image ? String(safeBody.image) : null)
    const payload = {
      title: safeBody.title ?? safeBody.file ?? null,
      description: safeBody.description ?? null,
      price: safeBody.price ?? null,
      priceDiscounted:
        safeBody.priceDiscounted ??
        safeBody.priceDiscounter ??
        safeBody.price_discounted ??
        null,
      image: stringImage,
    }
    if (!payload.title || payload.price === null || payload.price === undefined) {
      throw new BadRequestException('title and price are required')
    }
    const product = await this.productService.createProduct(payload)
    return { status: 'ok', data: product }
  }

  @Put('/:id')
  @HttpCode(200)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Record<string, any>
  ) {
    const product = await this.productService.updateProductData(id, body)
    return { status: 'ok', data: product }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProductData(id)
    return { status: 'ok' }
  }
}
