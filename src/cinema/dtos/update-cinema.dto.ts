import { PartialType } from "@nestjs/mapped-types";
import { Cinema } from "src/Models/cinema.model";


export class UpdateCinemaDto extends PartialType(Cinema){
}