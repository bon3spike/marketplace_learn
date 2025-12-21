import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'environment/.env.local', '.env.local'],
      cache: true,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
