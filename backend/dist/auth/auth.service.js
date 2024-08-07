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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const expiresAt = 20 * 1000;
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const payload = {
            email: user.email,
            id: user.id,
        };
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.JWT_SECRET,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_TOKEN,
                }),
                expiresAt: new Date().setTime(new Date().getTime() + expiresAt),
            },
        };
    }
    async validateUser(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (user && (await (0, bcrypt_1.compare)(dto.password, user.password))) {
            const { password, ...rest } = user;
            return rest;
        }
        throw new common_1.UnauthorizedException();
    }
    async refreshToken(user) {
        const payload = {
            email: user.email,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '2h',
                secret: process.env.JWT_SECRET,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_TOKEN,
            }),
            expiresAt: new Date().setTime(new Date().getTime() + expiresAt),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map