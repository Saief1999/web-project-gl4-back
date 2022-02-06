import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/decorators/role-metadata.decorator';
import { RoleAuthGuard } from 'src/guards/role-auth.guard';
import { Cinema } from 'src/Models/cinema.model';
import { UserRoleEnum } from 'src/Models/user.model';
import { RequestParamDto } from '../dtos/request-param.dto';
import { UpdateCinemaDto } from '../dtos/update-cinema.dto';
import { CinemaService } from '../services/cinema.service';

@UseGuards(AuthGuard('jwt'), RoleAuthGuard)
@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @Get(':id')
  async getCinema(@Param() params: RequestParamDto): Promise<Cinema> {
    const { id } = params;
    return this.cinemaService.findOne(id);
  }

  @Role(UserRoleEnum.user, UserRoleEnum.admin)
  @Get()
  async listCinemas(): Promise<Cinema[]> {
    return this.cinemaService.findAll();
  }

  @Role(UserRoleEnum.admin)
  @Post()
  async createCinema(@Body() cinema: Cinema) {
    return this.cinemaService.create(cinema);
  }

  @Role(UserRoleEnum.admin)
  @Put(':id')
  async updateCinema(
    @Param() params: RequestParamDto,
    @Body() cinema: UpdateCinemaDto,
  ) {
    const { id } = params;
    return this.cinemaService.update(id, cinema);
  }

  @Role(UserRoleEnum.admin)
  @Delete(':id')
  async removeCinema(@Param('id') id: string) {
    return this.cinemaService.remove(id);
  }

  @Role(UserRoleEnum.admin)
  @Patch('restore/:id')
  async restoreCinema(@Param() params: RequestParamDto) {
    const { id } = params;
    return this.cinemaService.restore(id);
  }
}
