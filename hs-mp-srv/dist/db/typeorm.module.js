"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
let TypeOrmModule = class TypeOrmModule {
};
exports.TypeOrmModule = TypeOrmModule;
exports.TypeOrmModule = TypeOrmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                name: 'hs_marketplace',
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    return {
                        name: 'hs_marketplace',
                        type: 'postgres',
                        host: (_a = config.get('POSTGRES_HOST')) !== null && _a !== void 0 ? _a : '127.0.0.1',
                        port: Number((_b = config.get('POSTGRES_PORT')) !== null && _b !== void 0 ? _b : 5432),
                        username: (_d = ((_c = config.get('POSTGRES_USER')) !== null && _c !== void 0 ? _c : config.get('POSTGRES_USERNAME'))) !== null && _d !== void 0 ? _d : 'nest_test',
                        password: (_f = ((_e = config.get('POSTGRES_PASSWORD')) !== null && _e !== void 0 ? _e : config.get('PGPASSWORD'))) !== null && _f !== void 0 ? _f : 'nest_test',
                        database: (_g = config.get('POSTGRES_DATABASE')) !== null && _g !== void 0 ? _g : 'nest_test',
                        applicationName: 'hs_marketplace',
                        entities: [(0, path_1.join)(__dirname, '..', 'entities', '**', '*.entity.{ts,js}')],
                        synchronize: true,
                        migrations: [(0, path_1.join)(__dirname, '..', 'db', 'migrations', '**', '*.js')],
                        migrationsRun: false,
                    };
                },
            }),
        ],
    })
], TypeOrmModule);
