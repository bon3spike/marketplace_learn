import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'
import { RedisModule } from '../../services/redis/redis.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'hs_marketplace'),
    JwtModule,
    RedisModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
