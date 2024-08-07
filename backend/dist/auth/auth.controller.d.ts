import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    register(dto: CreateUserDTO): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    login(dto: LoginDTO): Promise<{
        user: {
            id: number;
            email: string;
            name: string | null;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresAt: number;
        };
    }>;
    refreshToken(request: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
}
