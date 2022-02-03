import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/Models/user.model';
import { LoginDto } from '../dto/login.dto';
import { PayloadDto } from '../dto/payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginData: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginData;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException();
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new BadRequestException();
    } else {
      const payload: PayloadDto = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      const jwt = this.jwtService.sign(payload);
      return { token: jwt };
    }
  }
}
