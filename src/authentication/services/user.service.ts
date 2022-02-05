import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { BaseService } from 'src/generics/services/base.service';
import { User } from 'src/Models/user.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel(User.name) model: SoftDeleteModel<User & Document>) {
    super(model);
  }
  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.model.findOne({ username }).exec();
  }
}
