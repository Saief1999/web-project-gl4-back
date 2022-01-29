import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import * as mongoose from 'mongoose';

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepicture: { type: String },
  role: { type: String, enum: UserRoleEnum, required: true },
  createdAt: { type: Date, required: true },
  deletedAt: { type: Date, default: null }
});

export class UserModel {
  id: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
  role: UserRoleEnum
  profileImage: string;

  constructor(username, firstname, lastname, email, password) {
    this.username = username;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.createdAt = new Date(Date.now());
    this.deletedAt = null;
    this.role = UserRoleEnum.user;
    this.profileImage = '';
  }
}
