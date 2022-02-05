import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { AuthenticationResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthenticationService } from '../services/authentication.service';
@UsePipes(ValidationPipe)
@Controller()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('login')
  public async login(
    @Body() loginData: LoginDto,
  ): Promise<AuthenticationResponseDto> {
    const response: AuthenticationResponseDto =
      await this.authenticationService.login(loginData);
    return response;
  }

  @Post('signup')
  public async signup(
    @Body() data: RegisterDto,
  ): Promise<AuthenticationResponseDto> {
    const response = await this.authenticationService.register(data);
    return response;
  }

  @Post('confirm')
  public async confirmEmail(
    @Body() params: AuthenticationResponseDto,
  ): Promise<any> {
    const { token } = params;
    await this.emailConfirmationService.confirmEmail(token);
    return { message: 'Email Confirmed Successfully' };
  }
}
