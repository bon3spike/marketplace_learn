import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
    constructor() {
        super(
            {
                message: 'Credentials are incorrect',
                status: 'error',
                statusCode: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
        )
    }
}