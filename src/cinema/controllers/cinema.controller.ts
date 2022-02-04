import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Cinema } from "src/Models/cinema.model";
import { UpdateCinemaDto } from "../dtos/update-cinema.dto";
import { CinemaService } from "../services/cinema.service";


@Controller("cinemas")
export class CinemaController {

    constructor(private readonly cinemaService:CinemaService) {}

    @Get(":id")
    async getCinema(@Param('id') id:string):Promise<Cinema> {
        return this.cinemaService.findOne(id)
    } 

    @Get()
    async listCinemas():Promise<Cinema[]> {
        return this.cinemaService.findAll();
    }

    @Post()
    async createCinema(@Body() cinema:Cinema) {
        return this.cinemaService.create(cinema);
    }

    @Put(":id")
    async updateCinema(@Param('id') id:string,@Body() cinema:UpdateCinemaDto) {
        return this.cinemaService.update(id, cinema);
    }

    @Delete(":id")
    async removeCinema(@Param('id') id:string) {
        return this.cinemaService.remove(id);
    }

    @Patch("restore/:id")
    async restoreCinema(@Param('id') id:string) {
        return this.cinemaService.restore(id);
    }
}