import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Base } from "../db/base.model";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose"


@Injectable()
export class BaseService<Schema extends Base > {
    constructor(private readonly model:SoftDeleteModel<Schema & Document>) {}

    async findOne(id: string):Promise<Schema> {
        return this.model.findOne({_id:id}).exec();
    }

    async findAll():Promise<Schema[]>{
        return this.model.find({}).exec();
    }

    async create(schema:Schema):Promise<Schema> {
       const createModel = new this.model(schema);
       return createModel.save();
    }

    async update(id:string, schema):Promise<Schema> {
        return this.model.findOneAndUpdate({_id: id},schema, {
            new: true
          });
    }

    async remove(id:string) {

        const deleted = await this.model.softDelete({_id: id});
        return deleted;
    }

    async restore(id:string) {
        const restored = await this.model.restore({_id: id});
        return restored ; 
    }
}