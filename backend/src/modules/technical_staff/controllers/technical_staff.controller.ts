import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseUUIDPipe, Req, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from '../../users/dto/role-type.enum';
import { TechnicalStaffService } from '../services/technical_staff.service';
import { CreateTechnicalStaffDto } from '../dto/create-technical-staff.dto';
import { UpdateTechnicalStaffDto } from '../dto/update-technical-staff.dto';

@ApiTags('Technical Staff')
@Controller('technical-staff')
export class TechnicalStaffController {
  constructor(private readonly service: TechnicalStaffService) {}

  @Roles(RoleType.ADMIN, RoleType.COACH)
  @Post()
  @ApiOperation({ summary: 'Crear un miembro del staff técnico', description: 'Registra un nuevo miembro del staff técnico con datos personales y rol' })
  @ApiBody({ type: CreateTechnicalStaffDto })
  @ApiCreatedResponse({ description: 'Staff técnico creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateTechnicalStaffDto) {
    return this.service.create(dto);
  }

  @Roles(RoleType.ADMIN, RoleType.PLAYER, RoleType.COACH)
  @Get()
  @ApiOperation({ summary: 'Listar todo el staff técnico' })
  @ApiOkResponse({ description: 'Lista del staff técnico registrado' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener staff técnico' })
  findAll() {
    return this.service.findAll();
  }

  @Roles(RoleType.ADMIN, RoleType.PLAYER, RoleType.COACH)
  @Get('search')
  @ApiOperation({ summary: 'Buscar staff técnico por nombre completo' })
  @ApiQuery({ name: 'fullName', type: String, description: 'Nombre completo o parcial del miembro' })
  @ApiOkResponse({ description: 'Resultados de la búsqueda' })
  @ApiBadRequestResponse({ description: 'Parámetro de búsqueda inválido' })
  search(@Query('fullName') fullName: string) {
    return this.service.search(fullName);
  }

  @Roles(RoleType.ADMIN, RoleType.PLAYER, RoleType.COACH)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un miembro del staff técnico por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del miembro del staff técnico' })
  @ApiOkResponse({ description: 'Staff técnico encontrado' })
  @ApiNotFoundResponse({ description: 'Staff técnico no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Roles(RoleType.ADMIN, RoleType.COACH)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro del staff técnico', description: 'Actualiza datos personales o rol de un miembro existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del miembro del staff técnico' })
  @ApiBody({ type: UpdateTechnicalStaffDto })
  @ApiOkResponse({ description: 'Staff técnico actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Staff técnico no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  async update(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTechnicalStaffDto) {
    const user = (req as any).user;
    if (user.role === RoleType.COACH) {
      const staff = await this.service.findById(id);
      if (!staff.data || staff.data.user_id !== user.id) {
        throw new ForbiddenException('You can only edit your own profile');
      }
    }
    return this.service.update(id, dto);
  }

  @Roles(RoleType.ADMIN, RoleType.COACH)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un miembro del staff técnico', description: 'Elimina un miembro del staff técnico de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del miembro del staff técnico' })
  @ApiOkResponse({ description: 'Staff técnico eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Staff técnico no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
