import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Base } from 'src/generics/db/base.model';

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}
@Schema({ timestamps: true, versionKey: false })
export class User extends Base {
  _id?: string;

  @Prop({ type: String, required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @Prop({ type: String, required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({
    type: String,
    enum: UserRoleEnum,
    required: true,
    default: UserRoleEnum.user,
  })
  role?: UserRoleEnum;

  @Prop({ type: String })
  profileImage?: string;

  @Prop({ type: Boolean, required: true, default: false })
  activated?: boolean;
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(softDeletePlugin);
