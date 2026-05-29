import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly repository: TeamRepository) {}

  async create(dto: CreateTeamDto) {
    const result = await this.repository.createEntity(dto as any);
    if (!result.success) {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async findAll() {
    return this.repository.find();
  }

  async findById(id: string) {
    const team = await this.repository.findOne({ where: { id } as any });
    if (!team) {
      throw new NotFoundException('Team no encontrado');
    }
    return { success: true, message: 'Team encontrado', data: team };
  }

  async update(id: string, dto: UpdateTeamDto) {
    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException(result.message);
    }
    return result;
  }
}
