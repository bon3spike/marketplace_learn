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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const loginUser_dto_1 = require("./dto/loginUser.dto");
const registerUser_dto_1 = require("./dto/registerUser.dto");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../../services/redis/redis.service");
let UserController = class UserController {
    constructor(userService, jwtService, redisService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return { status: 'ok', data: users };
    }
    async setRedisKey(key) {
        await this.redisService.set(key, { test: 123 });
        return { status: 'ok', data: null };
    }
    async getRedisKey(key) {
        const value = await this.redisService.get(key);
        return { status: 'ok', data: value };
    }
    async getUser(id) {
        const userData = await this.userService.getUserById(id);
        return { status: 'ok', data: userData };
    }
    async createUser(body) {
        const user = await this.userService.createUser(body);
        return { status: 'ok', data: user };
    }
    async login(body) {
        const { loginOrEmail, password } = body;
        const foundUser = await this.userService.getUserByLoginOrEmail(loginOrEmail);
        if (!foundUser) {
            throw new common_1.ForbiddenException();
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, foundUser.password);
        if (!isPasswordValid)
            throw new common_1.ForbiddenException();
        const jwt = this.jwtService.sign({ x: 1 }, { secret: 'ggg' });
        return { status: 'ok', data: { accessToken: jwt }, };
    }
    async register(body) {
        await this.userService.createUser(body);
        return { status: 'ok', data: null };
    }
    async updateUser(id, body) {
        const data = await this.userService.updateUserData(id, body);
        return { status: 'ok', data };
    }
    async deleteUser(id) {
        await this.userService.deleteUser(id);
        return { status: 'ok', data: null };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/users'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/set-redis-key/:key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setRedisKey", null);
__decorate([
    (0, common_1.Get)('/get-redis-key/:key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRedisKey", null);
__decorate([
    (0, common_1.Get)('/users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/users'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Put)('/users/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/users/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], UserController);
