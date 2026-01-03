import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config.module'
import { TypeOrmModule } from './db/typeorm.module'
import { ProductModule } from './entities/product/product.module'
import { UserModule } from './entities/user/user.module'
import { RedisModule } from 'services/redis/redis.module'

@Module({
  imports: [ConfigModule, TypeOrmModule, UserModule, ProductModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
