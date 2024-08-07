import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDTO) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    console.log({ dto });
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() request) {
    return await this.authService.refreshToken(request.user);
  }
}
