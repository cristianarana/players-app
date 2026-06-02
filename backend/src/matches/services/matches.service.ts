import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchesRepository } from '../repositories/matches.repository';

@Injectable()
export class MatchesService {
  constructor(private readonly repository: MatchesRepository) {}

  async create(dto: any) {
    const result = await this.repository.createEntity(dto);
    if (!result.success) throw new NotFoundException(result.message);
    return result;
  }

  async findAll() {
    return this.repository.find({ relations: ['tournament'] });
  }

  async findById(id: string) {
    const stage = await this.repository.findOne({
      where: { id } as any,
      relations: ['tournament'],
    });
    if (!stage) throw new NotFoundException('CompetitionStage not found');
    return { success: true, message: 'CompetitionStage found', data: stage };
  }

  async update(id: string, dto: any) {
    const result = await this.repository.updateEntity(id, dto);
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
