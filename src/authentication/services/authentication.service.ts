import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/Models/user.model';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthenticationTokenPayloadDto } from '../dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationResponseDto } from '../dto/login-response.dto';
import { MailService } from 'src/mail/mail.service';
import { EmailConfirmationPayloadDto } from '../dto/email-confirmation-payload.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async login(loginData: LoginDto): Promise<AuthenticationResponseDto> {
    const { email, password } = loginData;
    const user: User = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('email does not match an exisiting user');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new BadRequestException('password is not correct');
    } else {
      return this.createJwtToken(user);
    }
  }

  public async register(
    registrationData: RegisterDto,
  ): Promise<AuthenticationResponseDto> {
    const { username, firstname, lastname, email, password } = registrationData;
    if (await this.userRepository.existsByUsername(username)) {
      throw new BadRequestException(
        'Username already used, please try another username',
      );
    }
    if (await this.userRepository.existsByEmail(email)) {
      throw new BadRequestException(
        'Email already used please try another email',
      );
    }
    const salt = await bcrypt.genSalt();
    const savedPassword = (await bcrypt.hash(password, salt)).toString();
    const user: User = {
      username,
      firstname,
      lastname,
      email,
      password: savedPassword,
    };
    const newUser = await this.userRepository.create(user);
    const emailPayload: EmailConfirmationPayloadDto = {
      username,
      firstname,
      lastname,
    };
    await this.mailService.mailConfirmation(emailPayload, email);
    return this.createJwtToken(newUser);
  }

  createJwtToken(user: User): AuthenticationResponseDto {
    const payload: AuthenticationTokenPayloadDto = {
      _id: user._id,
      email: user.email,
      username: user.username,
      activated: user.activated,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);
    return { token: jwt } as AuthenticationResponseDto;
  }
}
