import { PrismaService } from './../prisma.service';
import { CreateUserDTO } from './dto/user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDTO): Promise<{
        id: number;
        email: string;
        name: string | null;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string | null;
        password: string;
    }>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        password: string;
    }>;
}
