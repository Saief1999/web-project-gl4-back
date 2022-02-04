import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { EmailPayload } from 'src/authentication/dto/confirmation-mail-token.dto';
import { UserModel } from 'src/Models/user.model';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<UserModel>,
  ) {}

  public async confirmEmail(token: string): Promise<void> {
    if (!this.jwtService.verify(token)) {
      throw new BadRequestException({ message: 'unvalid jwt token' });
    }
    const { email } = this.jwtService.decode(token) as EmailPayload;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException({
        message: 'Token does not match an existing user',
      });
    }
    user.Activated = true;
    await user.save();
  }
}
