import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/Models/user.model';
export class LoginDto extends PickType(User, ['email', 'password']) {}
