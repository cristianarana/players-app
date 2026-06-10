import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from '../../users/dto/role-type.enum';
import { PlayerService } from '../services/player.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Roles(RoleType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear un jugador', description: 'Registra un nuevo jugador con datos personales, posición y detalles de contrato' })
  @ApiBody({ type: CreatePlayerDto })
  @ApiCreatedResponse({ description: 'Jugador creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreatePlayerDto) {
    return this.playerService.create(dto);
  }

  @Roles(RoleType.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar todos los jugadores' })
  @ApiOkResponse({ description: 'Lista de jugadores registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener jugadores' })
  findAll() {
    return this.playerService.findAll();
  }

  @Roles(RoleType.ADMIN)
  @Get('search')
  @ApiOperation({ summary: 'Buscar jugadores por nombre completo' })
  @ApiQuery({ name: 'fullName', type: String, description: 'Nombre completo o parcial del jugador' })
  @ApiOkResponse({ description: 'Resultados de la búsqueda' })
  @ApiBadRequestResponse({ description: 'Parámetro de búsqueda inválido' })
  search(@Query('fullName') fullName: string) {
    return this.playerService.search(fullName);
  }

  @Roles(RoleType.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un jugador por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del jugador' })
  @ApiOkResponse({ description: 'Jugador encontrado' })
  @ApiNotFoundResponse({ description: 'Jugador no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.playerService.findById(id);
  }

  @Roles(RoleType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un jugador', description: 'Actualiza datos personales, posición o detalles de contrato de un jugador existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del jugador' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiOkResponse({ description: 'Jugador actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Jugador no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePlayerDto) {
    return this.playerService.update(id, dto);
  }

  @Roles(RoleType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un jugador', description: 'Elimina un jugador de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del jugador' })
  @ApiOkResponse({ description: 'Jugador eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Jugador no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.playerService.delete(id);
  }
}
