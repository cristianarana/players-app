import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entity/training.entity';
import { TrainingPlayer } from './entity/training-player.entity';
import { TrainingRepository } from './repository/training.repository';
import { TrainingService } from './service/training.service';
import { TrainingController } from './controller/training.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Training, TrainingPlayer])],
  controllers: [TrainingController],
  providers: [TrainingRepository, TrainingService],
})
export class TrainingModule {}
