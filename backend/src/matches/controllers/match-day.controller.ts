import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { MatchDayService } from '../services/match-day.service';
import { CreateMatchDayDto } from '../dto/create-match-day.dto';
import { UpdateMatchDayDto } from '../dto/update-match-day.dto';

@Controller('match-days')
export class MatchDayController {
  constructor(private readonly service: MatchDayService) {}

  @Post()
  create(@Body() dto: CreateMatchDayDto) {
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
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMatchDayDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
