import { UserRoleEnum } from 'src/Models/user.model';

export class PayloadDto {
  email: string;
  password: string;
  role: UserRoleEnum;
}
