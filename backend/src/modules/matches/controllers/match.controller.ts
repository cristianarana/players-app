import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { MatchService } from '../services/match.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';

@ApiTags('Matches')
@Controller('matches')
export class MatchController {
  constructor(private readonly service: MatchService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un partido', description: 'Registra un nuevo partido con equipos local y visitante, marcador, estadio y jornada' })
  @ApiBody({ type: CreateMatchDto })
  @ApiCreatedResponse({ description: 'Partido creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateMatchDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los partidos' })
  @ApiOkResponse({ description: 'Lista de partidos registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener partidos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un partido por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del partido' })
  @ApiOkResponse({ description: 'Partido encontrado' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un partido', description: 'Actualiza marcador, estadio, fecha y/o equipos de un partido existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del partido' })
  @ApiBody({ type: UpdateMatchDto })
  @ApiOkResponse({ description: 'Partido actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateMatchDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un partido', description: 'Elimina un partido de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del partido' })
  @ApiOkResponse({ description: 'Partido eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Partido no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
