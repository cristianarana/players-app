import { Controller, Get, Post, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { TournamentTeamService } from './tournament-team.service';
import { CreateTournamentTeamDto } from './dto/create-tournament-team.dto';

@Controller('tournament-teams')
export class TournamentTeamController {
  constructor(private readonly service: TournamentTeamService) {}

  @Post()
  create(@Body() dto: CreateTournamentTeamDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
