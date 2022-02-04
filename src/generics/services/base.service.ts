import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Base } from "../db/base.model";

@Injectable()
export class BaseService<Schema extends Base > {

    constructor(private readonly model:Model<Schema>) {}

    async findOne(id: string):Promise<Schema> {
        return this.model.findOne({_id:id}).exec();
    }

    async findAll():Promise<Schema[]>{
        return this.model.find().exec();
    }

    async create(schema:Schema):Promise<Schema> {
       const createModel = new this.model(schema);
       return createModel.save();
    }

    async update(id:string, schema):Promise<Schema> {
        const updateModel = new this.model(schema);
        return updateModel.updateOne({ _id : id});
    }

    async remove(id:string) {
        const deletedModel = await this.model.findByIdAndRemove({_id: id}).exec();
        return deletedModel ;
    }

    // async restore(id:string) {
    // }
}