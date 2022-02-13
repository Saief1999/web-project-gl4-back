import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Genre, GenreSchema } from "src/Models/tmdb/db/genre.model";
import { MovieController } from "./controllers/movie.controller";
import { GenreService } from "./services/genre.service";
import { MovieService } from "./services/movie.service";

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),],
    controllers: [MovieController],
    providers: [MovieService, GenreService]
})
export class MovieModule {

}