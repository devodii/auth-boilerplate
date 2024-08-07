import { LoginDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
    validateUser(dto: LoginDTO): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    refreshToken(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
    }>;
}
