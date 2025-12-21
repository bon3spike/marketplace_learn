import { E_Gender } from '../types';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    nameFirst?: string;
    nameLast?: string;
    birthDate?: Date;
    gender?: E_Gender | null;
}
