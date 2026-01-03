import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { RedisModule } from '../../services/redis/redis.module'
import { JwtModule } from '../../services/jwt/jwt.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'hs_marketplace'),
    RedisModule,
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
