import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailConfirmationTokenPayloadDto } from 'src/authentication/dto/confirmation-mail-token.dto';
import { User } from 'src/Models/user.model';
import { UserService } from './user.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserService,
  ) {}

  public async confirmEmail(token: string): Promise<void> {
    if (!this.jwtService.verify(token)) {
      throw new BadRequestException({ message: 'unvalid jwt token' });
    }
    const { email } = this.jwtService.decode(
      token,
    ) as EmailConfirmationTokenPayloadDto;
    const user: User = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException({
        message: 'Token does not match an existing user',
      });
    }
    user.activated = true;
    this.userRepository.update(user._id, user);
  }
}
