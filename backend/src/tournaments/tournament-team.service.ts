import { Injectable, NotFoundException } from '@nestjs/common';
import { TournamentTeamRepository } from './tournament-team.repository';
import { CreateTournamentTeamDto } from './dto/create-tournament-team.dto';

@Injectable()
export class TournamentTeamService {
  constructor(private readonly repository: TournamentTeamRepository) {}

  async create(dto: CreateTournamentTeamDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return { ...result, message: 'Tournament team registration created successfully' };
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const registration = await this.repository.findOne({ where: { id } as any });
    if (!registration) {
      throw new NotFoundException('Tournament team registration not found');
    }
    return { success: true, message: 'Tournament team registration data: ', data: registration };
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Tournament team registration not found');
    }
    return result;
  }
}
