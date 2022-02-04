import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/generics/services/base.service";
import { Cinema, CinemaDocument } from "src/Models/cinema.model";


@Injectable()
export class CinemaService extends BaseService<Cinema>{
    constructor(@InjectModel(Cinema.name) model: Model<CinemaDocument>) {
        super(model);
    }
}