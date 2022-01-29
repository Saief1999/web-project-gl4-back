import { PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/Models/user.model';
export class LoginDto extends PickType(UserModel, ['email', 'password']) {}
