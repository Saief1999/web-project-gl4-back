import { UserRoleEnum } from 'src/Models/user.model';

export class AuthenticationTokenPayloadDto {
  email: string;
  password: string;
  role: UserRoleEnum;
}
