import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CompetitionStageService } from '../services/competition-stage.service';
import { CreateCompetitionStageDto } from '../dto/create-competition-stage.dto';
import { UpdateCompetitionStageDto } from '../dto/update-competition-stage.dto';

@ApiTags('Competition Stages')
@Controller('competition-stages')
export class CompetitionStageController {
  constructor(private readonly service: CompetitionStageService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una fase de competición', description: 'Registra una nueva fase asociada a un torneo' })
  @ApiBody({ type: CreateCompetitionStageDto })
  @ApiCreatedResponse({ description: 'Fase de competición creada exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateCompetitionStageDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las fases de competición' })
  @ApiOkResponse({ description: 'Lista de fases de competición registradas' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener fases de competición' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una fase de competición por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la fase de competición' })
  @ApiOkResponse({ description: 'Fase de competición encontrada' })
  @ApiNotFoundResponse({ description: 'Fase de competición no encontrada' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una fase de competición', description: 'Actualiza nombre, tipo y/o torneo de una fase existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la fase de competición' })
  @ApiBody({ type: UpdateCompetitionStageDto })
  @ApiOkResponse({ description: 'Fase de competición actualizada exitosamente' })
  @ApiNotFoundResponse({ description: 'Fase de competición no encontrada' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateCompetitionStageDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una fase de competición', description: 'Elimina una fase de competición de la base de datos (hard delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID de la fase de competición' })
  @ApiOkResponse({ description: 'Fase de competición eliminada exitosamente' })
  @ApiNotFoundResponse({ description: 'Fase de competición no encontrada' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
