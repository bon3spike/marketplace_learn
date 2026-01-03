import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule as NestRedisModule } from '@svtslv/nestjs-ioredis'
import { RedisService } from './redis.service'

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          host: config.get('REDIS_HOST') ?? '127.0.0.1',
          port: Number(config.get('REDIS_PORT') ?? 6379),
        },
      }),
    }),
  ],
  exports: [RedisService],
  providers: [RedisService],
})

export class RedisModule {}
