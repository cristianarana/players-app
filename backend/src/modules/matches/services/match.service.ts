import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MatchRepository } from '../repositories/match.repository';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Team } from '../../teams/entities/team.entity';
import { MatchDay } from '../entities/match-day.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly repository: MatchRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateMatchDto) {
    const homeTeam = await this.dataSource.manager.findOne(Team, { where: { id: dto.home_team_id } as any });
    if (!homeTeam) throw new NotFoundException(`Home team ${dto.home_team_id} not found`);

    const awayTeam = await this.dataSource.manager.findOne(Team, { where: { id: dto.away_team_id } as any });
    if (!awayTeam) throw new NotFoundException(`Away team ${dto.away_team_id} not found`);

    const matchDay = await this.dataSource.manager.findOne(MatchDay, { where: { id: dto.matchday_id } as any });
    if (!matchDay) throw new NotFoundException(`MatchDay ${dto.matchday_id} not found`);

    const result = await this.repository.createEntity(dto as any);
    if (!result.success) throw new BadRequestException(result.message);
    return result;
  }

  async findAll() {
    try {
      return await this.repository.find({ relations: ['homeTeam', 'awayTeam', 'matchDay'] });
    } catch {
      throw new InternalServerErrorException('Error fetching matches');
    }
  }

  async findById(id: string) {
    const match = await this.repository.findOne({
      where: { id } as any,
      relations: ['homeTeam', 'awayTeam', 'matchDay'],
    });
    if (!match) throw new NotFoundException('Match not found');
    return { success: true, message: 'Match found', data: match };
  }

  async update(id: string, dto: UpdateMatchDto) {
    if (dto.home_team_id) {
      const homeTeam = await this.dataSource.manager.findOne(Team, { where: { id: dto.home_team_id } as any });
      if (!homeTeam) throw new NotFoundException(`Home team ${dto.home_team_id} not found`);
    }
    if (dto.away_team_id) {
      const awayTeam = await this.dataSource.manager.findOne(Team, { where: { id: dto.away_team_id } as any });
      if (!awayTeam) throw new NotFoundException(`Away team ${dto.away_team_id} not found`);
    }
    if (dto.matchday_id) {
      const matchDay = await this.dataSource.manager.findOne(MatchDay, { where: { id: dto.matchday_id } as any });
      if (!matchDay) throw new NotFoundException(`MatchDay ${dto.matchday_id} not found`);
    }

    const result = await this.repository.updateEntity(id, dto as any);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Match not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Match not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
