import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ListResult } from "../dto/list-result";
import { Movie } from "../dto/movie";
import { MovieDetails } from "../dto/movie-details";

import { MovieService } from "../services/movie.service";

@Controller("movies")
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {

    constructor(private readonly movieService:MovieService) {}
    @Get("/search")
    search(@Query("query") query:string):Observable<ListResult<Movie>> {
        return this.movieService.search(query);
    }

    @Get(":id")
    getMovie(@Param("id") movieId:number):Observable<MovieDetails> {
        return this.movieService.getMovie(movieId);
    }

}