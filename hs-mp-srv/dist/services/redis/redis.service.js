"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const nestjs_ioredis_1 = require("@svtslv/nestjs-ioredis");
let RedisService = class RedisService {
    async set(key, data, expire) {
        return expire
            ? await this.redis.set(key, JSON.stringify(data), 'EX', expire)
            : await this.redis.set(key, JSON.stringify(data));
    }
    async get(key) {
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }
    async del(key) {
        return await this.redis.del(key);
    }
};
exports.RedisService = RedisService;
__decorate([
    (0, nestjs_ioredis_1.InjectRedis)(),
    __metadata("design:type", ioredis_1.Redis)
], RedisService.prototype, "redis", void 0);
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
