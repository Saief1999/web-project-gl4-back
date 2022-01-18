import { Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
    @Post('login')
    public login(): void {
        return;
    }

    @Post('signup')
    public signup(): void {
        return;
    }
}
