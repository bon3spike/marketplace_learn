import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Product } from './product.entity'

export type CreateProductDto = {
  title: string
  description?: string | null
  price: number | string
  priceDiscounted?: number | string | null
  image?: string | null
}

export type UpdateProductDto = Partial<CreateProductDto>

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product, 'hs_marketplace')
    private readonly productRepository: Repository<Product>
  ) {}

  private normalizeNumber(value: unknown) {
    if (value === undefined || value === null || value === '') return undefined
    const n = Number(value)
    return Number.isFinite(n) ? n : undefined
  }

  private normalizeNullableNumber(value: unknown) {
    if (value === undefined) return undefined
    if (value === null || value === '') return null
    const n = Number(value)
    return Number.isFinite(n) ? n : undefined
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async getProductData(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    return product
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const payload = {
      title: productData.title,
      description: productData.description ?? null,
      image: productData.image ?? null,
      price: this.normalizeNumber(productData.price),
      priceDiscounted: this.normalizeNullableNumber(
        productData.priceDiscounted
      ) ?? null,
    }
    const newProduct = this.productRepository.create(payload)
    return this.productRepository.save(newProduct)
  }

  async updateProductData(
    id: number,
    body: UpdateProductDto
  ): Promise<Product> {
    const existing = await this.getProductData(id)
    const payload: Partial<Product> = {
      title: body.title ?? existing.title,
      description: body.description ?? existing.description,
      image: body.image ?? existing.image,
    }
    const price = this.normalizeNumber(body.price)
    if (price !== undefined) {
      payload.price = price
    }
    const priceDiscounted = this.normalizeNullableNumber(body.priceDiscounted)
    if (priceDiscounted !== undefined) {
      payload.priceDiscounted = priceDiscounted
    }
    const merged = this.productRepository.merge(existing, payload)
    return this.productRepository.save(merged)
  }

  async deleteProductData(id: number): Promise<void> {
    await this.productRepository.delete({ id })
  }
}
