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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.availableFields = ['nameFirst', 'nameLast', 'email', 'gender', 'birthDate'];
    }
    filterFields(body) {
        const filteredBody = {};
        Object.keys(body)
            .filter((k) => this.availableFields.includes(k))
            .forEach((k) => {
            filteredBody[k] = body[k];
        });
        return filteredBody;
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    async getUserData(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createUser(payload) {
        const toCreate = this.filterFields(payload);
        if (payload.password) {
            const salt = await (0, bcrypt_1.genSalt)(10);
            toCreate.password = await (0, bcrypt_1.hash)(payload.password, salt);
        }
        const user = this.userRepository.create(toCreate);
        return this.userRepository.save(user);
    }
    async updateUserData(id, payload) {
        const existing = await this.getUserData(id);
        const filtered = this.filterFields(payload);
        const toSave = this.userRepository.merge(existing, filtered);
        return this.userRepository.save(toSave);
    }
    async deleteUser(id) {
        await this.userRepository.delete({ id });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User, 'hs_marketplace')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map