import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiParam, ApiBody, ApiConsumes,
  ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse,
  ApiNotFoundResponse, ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from '../../users/dto/role-type.enum';
import { TrainingService } from '../service/training.service';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';

@ApiTags('Trainings')
@Controller('trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Roles(RoleType.COACH)
  @Post()
  @ApiOperation({ summary: 'Crear un entrenamiento', description: 'Registra un nuevo entrenamiento con día, microciclo, objetivo y archivo opcional' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTrainingDto })
  @ApiCreatedResponse({ description: 'Entrenamiento creado exitosamente' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @UseInterceptors(
    FileInterceptor('info_file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads/trainings'),
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateTrainingDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      (dto as any).info_file = file.path;
    }
    return this.service.create(dto);
  }

  @Roles(RoleType.PLAYER, RoleType.COACH)
  @Get()
  @ApiOperation({ summary: 'Listar todos los entrenamientos' })
  @ApiOkResponse({ description: 'Lista de entrenamientos registrados' })
  @ApiInternalServerErrorResponse({ description: 'Error al obtener entrenamientos' })
  findAll() {
    return this.service.findAll();
  }

  @Roles(RoleType.PLAYER, RoleType.COACH)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un entrenamiento por UUID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del entrenamiento' })
  @ApiOkResponse({ description: 'Entrenamiento encontrado' })
  @ApiNotFoundResponse({ description: 'Entrenamiento no encontrado' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Roles(RoleType.COACH)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un entrenamiento', description: 'Actualiza día, microciclo, objetivo y/o archivo de un entrenamiento existente' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del entrenamiento' })
  @ApiBody({ type: UpdateTrainingDto })
  @ApiOkResponse({ description: 'Entrenamiento actualizado exitosamente' })
  @ApiNotFoundResponse({ description: 'Entrenamiento no encontrado' })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  @UseInterceptors(
    FileInterceptor('info_file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads/trainings'),
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrainingDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      (dto as any).info_file = file.path;
    }
    return this.service.update(id, dto);
  }

  @Roles(RoleType.COACH)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un entrenamiento', description: 'Elimina un entrenamiento de la base de datos (soft delete)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid', description: 'UUID del entrenamiento' })
  @ApiOkResponse({ description: 'Entrenamiento eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'Entrenamiento no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
