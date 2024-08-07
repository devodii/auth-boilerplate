import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const expiresAt = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDTO) {
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
        // time to expire from when the user made the request
        expiresAt: new Date().setTime(new Date().getTime() + expiresAt),
      },
    };
  }

  async validateUser(dto: LoginDTO) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    throw new UnauthorizedException();
  }

  // user payload stored in the request
  async refreshToken(user: any) {
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
}
