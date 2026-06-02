import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CompetitionStageRepository } from '../repositories/competition-stage.repository';
import { CreateCompetitionStageDto } from '../dto/create-competition-stage.dto';
import { UpdateCompetitionStageDto } from '../dto/update-competition-stage.dto';
import { Tournament } from '../../tournaments/tournament.entity';

@Injectable()
export class CompetitionStageService {
  constructor(
    private readonly repository: CompetitionStageRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateCompetitionStageDto) {
    const tournament = await this.dataSource.manager.findOne(Tournament, { where: { id: dto.tournament_id } as any });
    if (!tournament) throw new NotFoundException(`Tournament ${dto.tournament_id} not found`);

    const result = await this.repository.createEntity(dto as any);
    if (!result.success) throw new BadRequestException(result.message);
    return result;
  }

  async findAll() {
    try {
      return await this.repository.find({ relations: ['tournament', 'matchDays'] });
    } catch {
      throw new InternalServerErrorException('Error fetching competition stages');
    }
  }

  async findById(id: string) {
    const stage = await this.repository.findOne({
      where: { id } as any,
      relations: ['tournament', 'matchDays'],
    });
    if (!stage) throw new NotFoundException('CompetitionStage not found');
    return { success: true, message: 'CompetitionStage found', data: stage };
  }

  async update(id: string, dto: UpdateCompetitionStageDto) {
    if (dto.tournament_id) {
      const tournament = await this.dataSource.manager.findOne(Tournament, { where: { id: dto.tournament_id } as any });
      if (!tournament) throw new NotFoundException(`Tournament ${dto.tournament_id} not found`);
    }

    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('CompetitionStage not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('CompetitionStage not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
