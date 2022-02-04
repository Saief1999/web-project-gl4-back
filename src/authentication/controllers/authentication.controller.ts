import {
  Body,
  Controller,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailConfirmationService } from '../services/email-confirmation/email-confirmation.service';
import { LoginResponseDto } from '../dto/login-response.dto';
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
  public async login(@Body() loginData: LoginDto): Promise<LoginResponseDto> {
    const response: LoginResponseDto = await this.authenticationService.login(
      loginData,
    );
    return response;
  }

  @Post('signup')
  public async signup(@Body() data: RegisterDto): Promise<LoginResponseDto> {
    const response = await this.authenticationService.register(data);
    return response;
  }

  @Post('confirm')
  public async confirmEmail(
    @Query() params: LoginResponseDto,
  ): Promise<string> {
    const { token } = params;
    await this.emailConfirmationService.confirmEmail(token);
    return 'Email Confirmed Successfully';
  }
}
