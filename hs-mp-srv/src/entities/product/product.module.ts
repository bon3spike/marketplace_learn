import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductController } from './product.controller'
import { Product } from './product.entity'
import { ProductService } from './product.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product], 'hs_marketplace')],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
