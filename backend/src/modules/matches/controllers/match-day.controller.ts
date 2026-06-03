import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { MatchDayService } from '../services/match-day.service';
import { CreateMatchDayDto } from '../dto/create-match-day.dto';
import { UpdateMatchDayDto } from '../dto/update-match-day.dto';

@ApiTags('Match Days')
@Controller('match-days')
export class MatchDayController {
  constructor(private readonly service: MatchDayService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una jornada', description: 'Registra una nueva jornada asociada a una fase de competición' })
  @ApiBody({ type: CreateMatchDayDto })
  @ApiCreatedResponse({ description: 'Jornada creada exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateMatchDayDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las jornadas' })
  @ApiOkResponse({ description: 'Lista de jornadas registradas' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener jornadas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una jornada por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la jornada' })
  @ApiOkResponse({ description: 'Jornada encontrada' })
  @ApiNotFoundResponse({ description: 'Jornada no encontrada' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una jornada', description: 'Actualiza nombre, fechas y/o fase de una jornada existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la jornada' })
  @ApiBody({ type: UpdateMatchDayDto })
  @ApiOkResponse({ description: 'Jornada actualizada exitosamente' })
  @ApiNotFoundResponse({ description: 'Jornada no encontrada' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMatchDayDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una jornada', description: 'Elimina una jornada de la base de datos (hard delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la jornada' })
  @ApiOkResponse({ description: 'Jornada eliminada exitosamente' })
  @ApiNotFoundResponse({ description: 'Jornada no encontrada' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
