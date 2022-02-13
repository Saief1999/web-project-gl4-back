import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/services/authentication.service';
import { UserService } from 'src/authentication/services/user.service';
import { User } from 'src/Models/user.model';
import { AccountUpdateRequestDto } from '../dto/account-update-request.dto';
import { AccountUpdateResponseDto } from '../dto/account-update-response.dto';
import { PasswordUpdateRequestDto } from '../dto/password-update-request.dto';
import { PasswordChangementAttemptService } from './password-changement-attempt.service';
import { PasswordChangementAttempt } from 'src/Models/password-changement-attempt.model';
import { MailService } from 'src/mail/mail.service';
import { PasswordUpdateResponseDto } from '../dto/password-update-response.dto';
import { VerificationCodeRequestDto } from '../dto/verification-code-request.dto';
import { VerificationCodeResponseDto } from '../dto/verification-code-response.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
    private readonly passwordChangementRepo: PasswordChangementAttemptService,
    private readonly mailService: MailService,
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

  async updatePasswordPhaseOne(
    user: User,
    payload: PasswordUpdateRequestDto,
  ): Promise<PasswordUpdateResponseDto> {
    /**
     * Verify whether the password matches the users password
     * if it's the case store at the database the verification code with th user_id and the hashed new password
     * Send Email With the Verification Code
     * return success
     * else return bad request
     */
    const { currentPassword, newPassword } = payload;
    const oldProvided = await bcrypt.compare(currentPassword, user.password);
    if (oldProvided) {
      const salt = await bcrypt.genSalt();
      const savednewPassword = (
        await bcrypt.hash(newPassword, salt)
      ).toString();
      const verificationCode = Math.floor(Math.random() * 90000) + 10000;
      const savedAttempt: PasswordChangementAttempt = {
        username: user.username,
        verificationCode,
        newPassword: savednewPassword,
      };
      const exists = await this.passwordChangementRepo.existsByUsername(
        user.username,
      );
      if (exists) {
        const id = (
          await this.passwordChangementRepo.findByUsername(user.username)
        )._id;
        await this.passwordChangementRepo.update(id, savedAttempt);
      } else {
        await this.passwordChangementRepo.create(savedAttempt);
      }
      await this.mailService.sendPasswordChangementVerificationCode(
        user.email,
        verificationCode,
      );
      return { message: 'succussfull Attempt' } as PasswordUpdateResponseDto;
    } else
      throw new BadRequestException('Your current password provided is wrong');
  }

  async updatePasswordPhaseTwo(
    payload: VerificationCodeRequestDto,
    user: User,
  ): Promise<VerificationCodeResponseDto> {
    /**
     * Retrive the attempt to change the password
     * if there is non or the verification code does not match return error
     * else change the account's password and return success
     */
    const attempt: PasswordChangementAttempt =
      await this.passwordChangementRepo.findByUsername(user.username);
    if (attempt.verificationCode !== payload.verificationCode)
      throw new BadRequestException(
        'Wrong Verification code, please recheck your email for the correct one',
      );
    else {
      user.password = attempt.newPassword;
      await this.userService.update(user._id, user);
      return {
        message: 'Password Updated Succesfully',
      } as VerificationCodeResponseDto;
    }
  }
}
