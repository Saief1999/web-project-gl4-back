import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { Base } from "../db/base.model";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose"


@Injectable()
export class BaseService<Schema extends Base > {
    constructor(protected readonly model:SoftDeleteModel<Schema & Document>) {}

    async findOne(id: string):Promise<Schema> {
        const schema:Schema = await this.model.findOne({_id:id}).exec();
        if (!schema)
            throw new NotFoundException();
        return schema;
    }

    async findAll():Promise<Schema[]>{
        return this.model.find({}).exec();
    }

    async create(schema:Schema):Promise<Schema> {
       const createModel = new this.model(schema);
       return createModel.save();
    }

    async update(id:string, schema):Promise<Schema> {
        const newSchema = await this.model.findOneAndUpdate({_id: id},schema, {
            new: true
          });
        if (!newSchema)
          throw new NotFoundException();
        return newSchema;
    }

    async remove(id:string) {
        const deleted = await this.model.softDelete({_id: id});

        if (deleted && deleted.deleted === 0)
            throw new NotFoundException();

        return deleted;
    }

    async restore(id:string) {
        const restored  = await this.model.restore({_id: id});

        if (restored  && restored.restored === 0)
            throw new NotFoundException();

        return restored ; 
    }
}