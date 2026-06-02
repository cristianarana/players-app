import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TrainingRepository } from '../repository/training.repository';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { UpdateTrainingDto } from '../dto/update-training.dto';
import { TrainingPlayer } from '../entity/training-player.entity';
import { Player } from '../../players/player.entity';

@Injectable()
export class TrainingService {
  constructor(
    private readonly repository: TrainingRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateTrainingDto) {
    const { player_ids, ...trainingData } = dto;

    if (player_ids?.length) {
      for (const playerId of player_ids) {
        const player = await this.dataSource.manager.findOne(Player, { where: { id: playerId } as any });
        if (!player) throw new NotFoundException(`Player ${playerId} not found`);
      }
    }

    const result = await this.repository.createEntity(trainingData as any);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    const training = result.data!;

    if (player_ids?.length) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        for (const playerId of player_ids) {
          await queryRunner.manager.save(TrainingPlayer, {
            training_id: training.id,
            player_id: playerId,
          });
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Error creating training players');
      } finally {
        await queryRunner.release();
      }
    }

    return { ...result, message: 'Training created successfully' };
  }

  async findAll() {
    try {
      return await this.repository.find({ relations: ['trainingPlayers'] });
    } catch {
      throw new InternalServerErrorException('Error fetching trainings');
    }
  }

  async findById(id: string) {
    const training = await this.repository.findOne({
      where: { id } as any,
      relations: ['trainingPlayers'],
    });

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return { success: true, message: 'Training data: ', data: training };
  }

  async update(id: string, dto: UpdateTrainingDto) {
    const { player_ids, ...trainingData } = dto;

    if (player_ids !== undefined) {
      for (const playerId of player_ids) {
        const player = await this.dataSource.manager.findOne(Player, { where: { id: playerId } as any });
        if (!player) throw new NotFoundException(`Player ${playerId} not found`);
      }
    }

    const result = await this.repository.updateEntity(id, trainingData as any);

    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Training not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    if (player_ids !== undefined) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.delete(TrainingPlayer, { training_id: id });

        for (const playerId of player_ids) {
          await queryRunner.manager.save(TrainingPlayer, {
            training_id: id,
            player_id: playerId,
          });
        }

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Error updating training players');
      } finally {
        await queryRunner.release();
      }
    }

    return { ...result, message: 'Training updated successfully' };
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Training not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
