import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchDayRepository } from '../repositories/match-day.repository';
import { CreateMatchDayDto } from '../dto/create-match-day.dto';
import { UpdateMatchDayDto } from '../dto/update-match-day.dto';

@Injectable()
export class MatchDayService {
  constructor(private readonly repository: MatchDayRepository) {}

  async create(dto: CreateMatchDayDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) throw new NotFoundException(result.message);
    return result;
  }

  async findAll() {
    return this.repository.find({ relations: ['competitionStage'] });
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
    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('MatchDay not found');
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('MatchDay not found');
    }
    return result;
  }
}
