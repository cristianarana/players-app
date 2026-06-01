import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CrudRepository } from '@shared/repository/crud-repository';
import { TournamentTeam } from './tournament-team.entity';
import { ServiceResponse } from '@shared/repository/service-response.type';

@Injectable()
export class TournamentTeamRepository extends CrudRepository<TournamentTeam> {
  entityName = 'TournamentTeam';

  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TournamentTeam, dataSource);
  }

  async deleteById(id: string): Promise<ServiceResponse<null>> {
    try {
      const queryRunner = this.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await queryRunner.manager.softDelete(this.target, { id } as any);
        await queryRunner.commitTransaction();

        if (result.affected === 0) {
          return { success: false, message: 'Tournament team registration not found', error: 'NOT_FOUND' };
        }

        return { success: true, message: 'Tournament team registration deleted successfully' };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message: 'Error deleting tournament team registration', error: msg };
    }
  }
}
