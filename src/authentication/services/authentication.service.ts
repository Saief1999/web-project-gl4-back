import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/Models/user.model';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
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
      throw new BadRequestException({
        message: 'email does not match an exisiting user',
      });
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new BadRequestException({ message: 'password is not correct' });
    } else {
      const payload: PayloadDto = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      const jwt = this.jwtService.sign(payload);
      return { token: jwt } as LoginResponseDto;
    }
  }

  public async register(
    registrationData: RegisterDto,
  ): Promise<LoginResponseDto> {
    const { username, firstname, lastname, email, password } = registrationData;
    const userByUsername = await this.userModel.findOne({ username }).exec();
    if (userByUsername) {
      throw new BadRequestException({
        message: 'Username already used, please try another username',
      });
    }
    const userByEmail = await this.userModel.findOne({ email }).exec();
    if (userByEmail) {
      throw new BadRequestException({
        message: 'Email already used please try another email',
      });
    }
    const salt = await bcrypt.genSalt();
    const savedPassword = (await bcrypt.hash(password, salt)).toString();
    const userData = new UserModel(
      username,
      firstname,
      lastname,
      email,
      savedPassword,
    );
    const newUser = new this.userModel(userData);
    await newUser.save();
    const payload: PayloadDto = {
      email: email,
      password: password,
      role: newUser.role,
    };
    const jwt = this.jwtService.sign(payload);
    return { token: jwt } as LoginResponseDto;
  }
}
