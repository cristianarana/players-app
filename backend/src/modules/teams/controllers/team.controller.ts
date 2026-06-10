import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from '../../users/dto/role-type.enum';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';

@ApiTags('Teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @Roles(RoleType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear un equipo', description: 'Registra un nuevo equipo con nombre, país y ciudad' })
  @ApiBody({ type: CreateTeamDto })
  @ApiCreatedResponse({ description: 'Equipo creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos (nombre, país o ciudad incorrectos)' })
  create(@Body() dto: CreateTeamDto) {
    return this.service.create(dto);
  }

  @Roles(RoleType.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar todos los equipos' })
  @ApiOkResponse({ description: 'Lista de equipos registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener equipos' })
  findAll() {
    return this.service.findAll();
  }

  @Roles(RoleType.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del equipo' })
  @ApiOkResponse({ description: 'Equipo encontrado' })
  @ApiNotFoundResponse({ description: 'Equipo no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Roles(RoleType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo', description: 'Actualiza nombre, país y/o ciudad de un equipo existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiOkResponse({ description: 'Equipo actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Equipo no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTeamDto) {
    return this.service.update(id, dto);
  }

  @Roles(RoleType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo', description: 'Elimina un equipo de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: 'Equipo eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Equipo no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
