import { PrismaService } from './../prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user?.id) throw new ConflictException('Duplicate Email');

    const newUser = await this.prisma.user.create({
      data: { ...dto, password: await hash(dto.password, 10) },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;

    return rest;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({ where: { id: Number(id) } });
  }
}
