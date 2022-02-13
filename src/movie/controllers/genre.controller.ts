import { ClassSerializerInterceptor, Controller, Get, Param, Put, Query, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Genre } from "src/Models/tmdb/db/genre.model";
import { GenreService } from "../services/genre.service";
import { MovieService } from "../services/movie.service";

@Controller("genres")
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {

    constructor(private readonly genreService:GenreService) {}
    @Get("movies")
    async listGentre(): Promise<Genre[]> {
      return this.genreService.findAll({}, { createdAt: 0, updatedAt: 0, deletedAt: 0, isDeleted: 0 });
    }

    @Put("refresh/movies")
    async refreshList() {
        return this.genreService.refreshMoviesGenres();
    }
}