import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { User, UserSchema } from 'src/Models/user.model';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 86400,
      },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
