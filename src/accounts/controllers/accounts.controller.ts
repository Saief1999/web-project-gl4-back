import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role-metadata.decorator';
import { RoleAuthGuard } from 'src/guards/role-auth.guard';
import { User, UserRoleEnum } from 'src/Models/user.model';

@Controller('accounts')
export class AccountsController {
  @Get('me')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  me(@GetUser() user: User): User {
    return user;
  }
}
