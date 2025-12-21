import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      name: 'hs_marketplace',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          name: 'hs_marketplace',
          type: 'postgres',
          host: config.get('POSTGRES_HOST') ?? '127.0.0.1',
          port: Number(config.get('POSTGRES_PORT') ?? 5432),
          username:
            (config.get('POSTGRES_USER') ?? config.get('POSTGRES_USERNAME')) ??
            'nest_test',
          password:
            (config.get('POSTGRES_PASSWORD') ?? config.get('PGPASSWORD')) ??
            'nest_test',
          database: config.get('POSTGRES_DATABASE') ?? 'nest_test',
          applicationName: 'hs_marketplace',
          entities: [join(__dirname, '..', 'entities', '**', '*.entity.{ts,js}')],
          synchronize: true,
          migrations: [join(__dirname, '..', 'db', 'migrations', '**', '*.js')],
          migrationsRun: false,
        }
      },
    }),
  ],
})
export class TypeOrmModule {}
