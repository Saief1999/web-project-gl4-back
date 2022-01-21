import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { BadRequestExceptionFilter } from 'src/filters/bad-request-exception.filter';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthenticationService } from '../services/authentication.service';

@UseFilters(BadRequestExceptionFilter)
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
  public signup(): void {
    return;
  }
}
