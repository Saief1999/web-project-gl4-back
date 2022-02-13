import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Role } from 'src/decorators/role-metadata.decorator';
import { RoleAuthGuard } from 'src/guards/role-auth.guard';
import { User, UserRoleEnum } from 'src/Models/user.model';
import { AccountUpdateRequestDto } from '../dto/account-update-request.dto';
import { AccountUpdateResponseDto } from '../dto/account-update-response.dto';
import { PasswordUpdateRequestDto } from '../dto/password-update-request.dto';
import { PasswordUpdateResponseDto } from '../dto/password-update-response.dto';
import { VerificationCodeRequestDto } from '../dto/verification-code-request.dto';
import { VerificationCodeResponseDto } from '../dto/verification-code-response.dto';
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

  @Post('me/password')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  async updatePasswordMe(
    @Body() payload: PasswordUpdateRequestDto,
    @GetUser() user: User,
  ): Promise<PasswordUpdateResponseDto> {
    return this.accountService.updatePasswordPhaseOne(user, payload);
  }

  @Put('me/password/confirm')
  @UseGuards(AuthGuard('jwt'), RoleAuthGuard)
  @Role(UserRoleEnum.user)
  async confirmUpdatePasswordMe(
    @Body() payload: VerificationCodeRequestDto,
    @GetUser() user: User,
  ): Promise<VerificationCodeResponseDto> {
    return this.accountService.updatePasswordPhaseTwo(payload, user);
  }
}
