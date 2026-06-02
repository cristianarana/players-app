import { Injectable, NotFoundException } from '@nestjs/common';
import { CompetitionStageRepository } from '../repositories/competition-stage.repository';
import { CreateCompetitionStageDto } from '../dto/create-competition-stage.dto';
import { UpdateCompetitionStageDto } from '../dto/update-competition-stage.dto';

@Injectable()
export class CompetitionStageService {
  constructor(private readonly repository: CompetitionStageRepository) {}

  async create(dto: CreateCompetitionStageDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) throw new NotFoundException(result.message);
    return result;
  }

  async findAll() {
    return this.repository.find({ relations: ['tournament', 'matchDays'] });
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
    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('CompetitionStage not found');
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('CompetitionStage not found');
    }
    return result;
  }
}
