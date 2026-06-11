import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from '../dto/role-type.enum';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Roles(RoleType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear un usuario', description: 'Registra un nuevo usuario con username, password y rol' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Usuario creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Roles(RoleType.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiOkResponse({ description: 'Lista de usuarios registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener usuarios' })
  findAll() {
    return this.service.findAll();
  }

  @Roles(RoleType.ADMIN)
  @Get('username/:username')
  @ApiOperation({ summary: 'Obtener un usuario por username' })
  @ApiParam({ name: 'username', type: String, description: 'Username del usuario' })
  @ApiOkResponse({ description: 'Usuario encontrado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  findByUsername(@Param('username') username: string) {
    return this.service.findByUsername(username);
  }

  @Roles(RoleType.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del usuario' })
  @ApiOkResponse({ description: 'Usuario encontrado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Roles(RoleType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario', description: 'Actualiza username y/o rol de un usuario existente' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Usuario actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }

  @Roles(RoleType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario', description: 'Desactiva un usuario (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del usuario' })
  @ApiOkResponse({ description: 'Usuario desactivado exitosamente' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
