import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MatchDayRepository } from '../repositories/match-day.repository';
import { CreateMatchDayDto } from '../dto/create-match-day.dto';
import { UpdateMatchDayDto } from '../dto/update-match-day.dto';
import { CompetitionStage } from '../entities/competition-stage.entity';

@Injectable()
export class MatchDayService {
  constructor(
    private readonly repository: MatchDayRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateMatchDayDto) {
    const stage = await this.dataSource.manager.findOne(CompetitionStage, { where: { id: dto.competition_stage_id } as any });
    if (!stage) throw new NotFoundException(`CompetitionStage ${dto.competition_stage_id} not found`);

    const result = await this.repository.createEntity(dto as any);
    if (!result.success) throw new BadRequestException(result.message);
    return result;
  }

  async findAll() {
    try {
      return await this.repository.find({ relations: ['competitionStage'] });
    } catch {
      throw new InternalServerErrorException('Error fetching match days');
    }
  }

  async findById(id: string) {
    const day = await this.repository.findOne({
      where: { id } as any,
      relations: ['competitionStage'],
    });
    if (!day) throw new NotFoundException('MatchDay not found');
    return { success: true, message: 'MatchDay found', data: day };
  }

  async update(id: string, dto: UpdateMatchDayDto) {
    if (dto.competition_stage_id) {
      const stage = await this.dataSource.manager.findOne(CompetitionStage, { where: { id: dto.competition_stage_id } as any });
      if (!stage) throw new NotFoundException(`CompetitionStage ${dto.competition_stage_id} not found`);
    }

    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('MatchDay not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('MatchDay not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
