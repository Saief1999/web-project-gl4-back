import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { BaseService } from "src/generics/services/base.service";
import { Cinema } from "src/Models/cinema.model";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

@Injectable()
export class CinemaService extends BaseService<Cinema>{
    constructor(@InjectModel(Cinema.name) model: SoftDeleteModel<Cinema & Document>) {
        super(model);
    }
}