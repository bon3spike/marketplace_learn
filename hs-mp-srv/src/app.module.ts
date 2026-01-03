import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config.module'
import { TypeOrmModule } from './db/typeorm.module'
import { ProductModule } from './entities/product/product.module'
import { UserModule } from './entities/user/user.module'

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
