import { Response, Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(res: Response, account: string): Promise<{
        status: string;
        data: import("./user.entity").User[];
        account: string;
    }>;
    getUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(id: number, body: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
