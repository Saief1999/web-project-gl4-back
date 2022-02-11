import { PickType } from '@nestjs/mapped-types';
import { User, UserRoleEnum } from 'src/Models/user.model';

export class AuthenticationTokenPayloadDto extends PickType(User, [
  '_id',
  'email',
  'role',
  'username',
  'activated',
]) {}
