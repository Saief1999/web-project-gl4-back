import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { ListResult } from "src/Models/tmdb/list-result";
import { Movie } from "src/Models/tmdb/movie";
import { MovieDetails } from "src/Models/tmdb/movie-details";
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