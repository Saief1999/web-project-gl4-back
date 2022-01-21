import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatedPassword: string;
}
