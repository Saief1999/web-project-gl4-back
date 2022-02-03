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
  createdat: { type: String, required: true },
});

export class UserModel {
  public username: string;
  public firstName: string;
  public password: string;
  public email: string;
  public createdAt: Date = new Date(Date.now());
  public deletedAt: Date | null = null;
  public role: UserRoleEnum;
  public profileImage: string;
}
