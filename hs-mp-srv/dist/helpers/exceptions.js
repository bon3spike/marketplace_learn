"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
class ForbiddenException extends common_1.HttpException {
    constructor() {
        super({
            message: 'Credentials are incorrect',
            status: 'error',
            statusCode: common_1.HttpStatus.FORBIDDEN,
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=exceptions.js.map