import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    availableFields: string[];
    private filterFields;
    getAllUsers(): Promise<User[]>;
    getUserData(id: number): Promise<User>;
    createUser(payload: Partial<User>): Promise<User>;
    updateUserData(id: number, payload: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<void>;
}
