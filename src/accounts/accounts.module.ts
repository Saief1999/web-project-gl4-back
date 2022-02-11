import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { JwtStrategy } from 'src/authentication/strategy/jwt.strategy';
import { AccountsController } from './controllers/accounts.controller';

@Module({
  imports: [AuthenticationModule],
  controllers: [AccountsController],
  providers: [JwtStrategy],
})
export class AccountsModule {}
