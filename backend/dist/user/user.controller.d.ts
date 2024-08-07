import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getprofile(id: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        password: string;
    }>;
}
