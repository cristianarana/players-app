import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly service: TournamentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un torneo', description: 'Registra un nuevo torneo con tipo, fechas y equipos participantes' })
  @ApiBody({ type: CreateTournamentDto })
  @ApiCreatedResponse({ description: 'Torneo creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateTournamentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los torneos' })
  @ApiOkResponse({ description: 'Lista de torneos registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener torneos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un torneo por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del torneo' })
  @ApiOkResponse({ description: 'Torneo encontrado' })
  @ApiNotFoundResponse({ description: 'Torneo no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un torneo', description: 'Actualiza tipo, fechas y/o equipos de un torneo existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del torneo' })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiOkResponse({ description: 'Torneo actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Torneo no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTournamentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un torneo', description: 'Elimina un torneo de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del torneo' })
  @ApiOkResponse({ description: 'Torneo eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Torneo no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
