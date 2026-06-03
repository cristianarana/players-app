import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TournamentRepository } from '../repositories/tournament.repository';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { TournamentTeam } from '../entities/tournament-team.entity';
import { Team } from '../../teams/entities/team.entity';

@Injectable()
export class TournamentService {
  constructor(
    private readonly repository: TournamentRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateTournamentDto) {
    const { team_ids, ...tournamentData } = dto;

    if (team_ids?.length) {
      for (const teamId of team_ids) {
        const team = await this.dataSource.manager.findOne(Team, { where: { id: teamId } as any });
        if (!team) throw new NotFoundException(`Team ${teamId} not found`);
      }
    }

    const result = await this.repository.createEntity(tournamentData as any);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    const tournament = result.data!;

    if (team_ids?.length) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        for (const teamId of team_ids) {
          await queryRunner.manager.save(TournamentTeam, {
            tournament_id: tournament.id,
            team_id: teamId,
          });
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Error creating tournament teams');
      } finally {
        await queryRunner.release();
      }
    }

    return { ...result, message: 'Tournament created successfully' };
  }

  async findAll() {
    try {
      return await this.repository.find({ relations: ['tournamentTeams'] });
    } catch {
      throw new InternalServerErrorException('Error fetching tournaments');
    }
  }

  async findById(id: string) {
    const tournament = await this.repository.findOne({
      where: { id } as any,
      relations: ['tournamentTeams'],
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return { success: true, message: 'Tournament data: ', data: tournament };
  }

  async update(id: string, dto: UpdateTournamentDto) {
    const { team_ids, ...tournamentData } = dto;

    if (team_ids !== undefined) {
      for (const teamId of team_ids) {
        const team = await this.dataSource.manager.findOne(Team, { where: { id: teamId } as any });
        if (!team) throw new NotFoundException(`Team ${teamId} not found`);
      }
    }

    const result = await this.repository.updateEntity(id, tournamentData as any);

    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Tournament not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    if (team_ids !== undefined) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.delete(TournamentTeam, { tournament_id: id });

        for (const teamId of team_ids) {
          await queryRunner.manager.save(TournamentTeam, {
            tournament_id: id,
            team_id: teamId,
          });
        }

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Error updating tournament teams');
      } finally {
        await queryRunner.release();
      }
    }

    return { ...result, message: 'Tournament updated successfully' };
  }

  async delete(id: string) {
    const result = await this.repository.deleteById(id);
    if (!result.success && result.error === 'NOT_FOUND') {
      throw new NotFoundException('Tournament not found');
    }
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
