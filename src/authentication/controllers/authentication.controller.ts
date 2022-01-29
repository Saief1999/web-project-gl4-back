import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthenticationService } from '../services/authentication.service';
@UsePipes(ValidationPipe)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

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
}
