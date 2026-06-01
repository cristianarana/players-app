import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { TrainingService } from '../service/training.service';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';

@Controller('trainings')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Post()
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

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
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

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.delete(id);
  }
}
