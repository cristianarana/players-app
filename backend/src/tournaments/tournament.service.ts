import { Injectable, NotFoundException } from '@nestjs/common';
import { TournamentRepository } from './tournament.repository';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(private readonly repository: TournamentRepository) {}

  async create(dto: CreateTournamentDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return { ...result, message: 'Tournament created successfully' };
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const tournament = await this.repository.findOne({ where: { id } as any });
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }
    return { success: true, message: 'Tournament data: ', data: tournament };
  }

  async update(id: string, dto: UpdateTournamentDto) {
    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Tournament not found');
    }
    return { ...result, message: 'Tournament updated successfully' };
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Tournament not found');
    }
    return result;
  }
}
