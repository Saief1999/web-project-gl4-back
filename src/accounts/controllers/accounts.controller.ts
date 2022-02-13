import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role-metadata.decorator';
import { RoleAuthGuard } from 'src/guards/role-auth.guard';
import { User, UserRoleEnum } from 'src/Models/user.model';
import { AccountUpdateRequestDto } from '../dto/account-update-request.dto';
import { AccountUpdateResponseDto } from '../dto/account-update-response.dto';
import { PasswordUpdateRequestDto } from '../dto/password-update-request.dto';
import { AccountsService } from '../services/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  me(@GetUser() user: User): User {
    return user;
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  async updateMe(
    @Body() payload: AccountUpdateRequestDto,
    @GetUser() user: User,
  ): Promise<AccountUpdateResponseDto> {
    return this.accountService.updateGeneralInfo(user, payload);
  }

  @Put('me/password')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  async updatePasswordMe(
    @Body() payload: PasswordUpdateRequestDto,
    @GetUser() user: User,
  ): Promise<string> {
    return this.accountService.updatePasswordPhaseOne(user, payload);
  }
}
