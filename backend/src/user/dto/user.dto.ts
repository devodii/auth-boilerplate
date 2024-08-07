import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
