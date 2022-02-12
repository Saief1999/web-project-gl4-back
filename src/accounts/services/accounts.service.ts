import { Injectable } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { UserService } from 'src/authentication/services/user.service';
import { User } from 'src/Models/user.model';
import { AccountUpdateRequestDto } from '../dto/account-update-request.dto';
import { AccountUpdateResponseDto } from '../dto/account-update-response.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async updateGeneralInfo(
    user: User,
    payload: AccountUpdateRequestDto,
  ): Promise<AccountUpdateResponseDto> {
    // valid payload and you are loged in
    // get the user
    // update it
    // save the user
    // recreate the token
    // return the new user and the token
    const newUser = await this.userService.update(user._id, payload);
    const data = this.authenticationService.createJwtToken(newUser);
    return { token: data.token, user: newUser };
  }
}
