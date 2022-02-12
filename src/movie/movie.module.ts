import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MovieController } from "./controllers/movie.controller";
import { MovieService } from "./services/movie.service";

@Module({
    imports: [HttpModule],
    controllers: [MovieController],
    providers: [MovieService]
})
export class MovieModule {

}