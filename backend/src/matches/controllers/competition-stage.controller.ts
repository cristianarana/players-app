import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CompetitionStageService } from '../services/competition-stage.service';
import { CreateCompetitionStageDto } from '../dto/create-competition-stage.dto';
import { UpdateCompetitionStageDto } from '../dto/update-competition-stage.dto';

@Controller('competition-stages')
export class CompetitionStageController {
  constructor(private readonly service: CompetitionStageService) {}

  @Post()
  create(@Body() dto: CreateCompetitionStageDto) {
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

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompetitionStageDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
