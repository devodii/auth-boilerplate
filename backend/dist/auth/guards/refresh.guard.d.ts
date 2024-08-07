import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class RefreshJwtGuard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
